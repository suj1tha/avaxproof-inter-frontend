import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import TaskContract from './contracts/TaskContract.json'; // You need to create this ABI file

const contractAddress = '0x3928EaF259eFed077Afa6dC37E6cA4edf39E939F';

function App() {
  const [tasks, setTasks] = useState([]);
  const [description, setDescription] = useState('');
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const loadProvider = async () => {
      if (window.ethereum) {
        const newProvider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(newProvider);
        const newSigner = newProvider.getSigner();
        setSigner(newSigner);
        const newContract = new ethers.Contract(contractAddress, TaskContract, newSigner);
        setContract(newContract);
        loadTasks(newContract);
      } else {
        console.error("No Ethereum wallet found. Install Metamask.");
      }
    };

    loadProvider();
  }, []);

  const loadTasks = async (contract) => {
    const tasksFromChain = await contract.getTasks();
    const filteredTasks = tasksFromChain.filter(task => task.id != 0);
    setTasks(filteredTasks);
  };

  const addTask = async () => {
    if (description && contract) {
      const transaction = await contract.addTask(description);
      await transaction.wait();
      loadTasks(contract);
      setDescription('');
    }
  };

  const completeTask = async (taskId) => {
    const transaction = await contract.completeTask(taskId);
    await transaction.wait();
    loadTasks(contract);
  };

  const removeTask = async (taskId) => {
    const transaction = await contract.removeTask(taskId);
    await transaction.wait();
    loadTasks(contract);
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <input 
        type="text" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        placeholder="New task description" 
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.description} - {task.isCompleted ? 'Completed' : 'Pending'}
            <button onClick={() => completeTask(task.id)}>Complete</button>
            <button onClick={() => removeTask(task.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
