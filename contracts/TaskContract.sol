// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TaskContract {
    struct Task {
        uint id;
        string description;
        bool isCompleted;
    }

    uint private taskCount;
    mapping(uint => Task) private tasks;

    event TaskAdded(uint id, string description);
    event TaskCompleted(uint id);
    event TaskRemoved(uint id);

    function addTask(string memory description) public {
        taskCount++;
        tasks[taskCount] = Task(taskCount, description, false);
        emit TaskAdded(taskCount, description);
    }

    function completeTask(uint id) public {
        require(tasks[id].id != 0, "Task does not exist");
        tasks[id].isCompleted = true;
        emit TaskCompleted(id);
    }

    function removeTask(uint id) public {
        require(tasks[id].id != 0, "Task does not exist");
        delete tasks[id];
        emit TaskRemoved(id);
    }

    function getTasks() public view returns (Task[] memory) {
        Task[] memory taskArray = new Task[](taskCount);
        uint index = 0;
        for (uint i = 1; i <= taskCount; i++) {
            if (tasks[i].id != 0) {
                taskArray[index] = tasks[i];
                index++;
            }
        }
        return taskArray;
    }
}
