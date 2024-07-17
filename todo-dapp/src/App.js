import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import TaskContract from './contracts/TaskContract.json';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskDescription, setTaskDescription] = useState('');
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const loadWeb3 = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        setWeb3(web3);
      } else {
        const provider = new Web3.providers.HttpProvider(`https://sepolia.infura.io/v3/${process.env.REACT_APP_INFURA_PROJECT_ID}`);
        const web3 = new Web3(provider);
        setWeb3(web3);
      }
    };

    loadWeb3();
  }, []);

  useEffect(() => {
    const loadBlockchainData = async () => {
      if (web3) {
        try {
          const networkId = await web3.eth.net.getId();
          const deployedNetwork = TaskContract.networks[networkId];
          if (deployedNetwork) {
            const contractInstance = new web3.eth.Contract(
              TaskContract.abi,
              deployedNetwork.address
            );
            setContract(contractInstance);
            const accounts = await web3.eth.getAccounts();
            setAccount(accounts[0]);
            const taskCount = await contractInstance.methods.taskCount().call();
            const loadedTasks = [];
            for (let i = 1; i <= taskCount; i++) {
              const task = await contractInstance.methods.tasks(i).call();
              loadedTasks.push(task);
            }
            setTasks(loadedTasks);
          } else {
            console.error('Smart contract not deployed to detected network.');
          }
        } catch (error) {
          console.error('Error loading blockchain data:', error);
        }
      }
    };

    loadBlockchainData();
  }, [web3]);

  const addTask = async () => {
    if (contract && account) {
      await contract.methods.addTask(taskDescription).send({ from: account });
      setTasks([...tasks, { id: tasks.length + 1, description: taskDescription, isCompleted: false }]);
      setTaskDescription('');
    }
  };

  const completeTask = async (taskId) => {
    if (contract && account) {
      await contract.methods.completeTask(taskId).send({ from: account });
      const updatedTasks = tasks.map(task => task.id === taskId ? { ...task, isCompleted: true } : task);
      setTasks(updatedTasks);
    }
  };

  const removeTask = async (taskId) => {
    if (contract && account) {
      await contract.methods.removeTask(taskId).send({ from: account });
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      setTasks(updatedTasks);
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <span style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>
              {task.description}
            </span>
            {!task.isCompleted && <button onClick={() => completeTask(task.id)}>Complete</button>}
            <button onClick={() => removeTask(task.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
