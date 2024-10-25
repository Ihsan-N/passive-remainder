'use client';
import React, { useState, useEffect } from 'react';
import '../app/globals.css'; // Make sure to import your custom CSS

interface Task {
  text: string;
  time: string;
}

const sarcasticReminders = [
  "Oh look, another thing you’ll probably ignore.",
  "Did you *really* think you’d get this done on time?",
  "If procrastination were a sport, you’d be winning.",
  "Just a friendly reminder, since apparently you need it.",
  "Wow, you’re still not done? Impressive commitment to doing nothing.",
  "Remember that task? No? Figures.",
];

const Reminder: React.FC = () => {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState<string>("");
  const [newTaskTime, setNewTaskTime] = useState<string>("");
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(checkReminders, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [taskList]);

  const checkReminders = () => {
    const currentTime = new Date().toTimeString().slice(0, 5); // Get current time in HH:MM format
    taskList.forEach((task) => {
      if (task.time === currentTime) {
        const randomReminderIndex = Math.floor(Math.random() * sarcasticReminders.length);
        const reminderText = `${sarcasticReminders[randomReminderIndex]} - Task: ${task.text}`;
        setNotification(reminderText);
        playNotificationSound();
        //speakNotification(reminderText); // Read the notification aloud
      }
    });
  };

  const addTask = () => {
    if (newTaskText.trim() && newTaskTime.trim()) {
      const newTask: Task = { text: newTaskText, time: newTaskTime };
      setTaskList([...taskList, newTask]);
      setNewTaskText("");
      setNewTaskTime("");
    }
  };

  const playNotificationSound = () => {
    const audio = new Audio('/notification.mp3'); // Place sound file in public folder
    audio.play();
  };

//   const speakNotification = (text: string) => {
//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.lang = 'en-US'; // Set the language if needed
//     window.speechSynthesis.speak(utterance);
//   };

  return (
    <div className="flex flex-col items-center justify-center p-6 max-w-md mx-auto bg-yellow-100 rounded-lg shadow-lg mt-10">
      <h1 className="text-3xl font-bold text-red-600 animate-bounce">⚠️ Passive-Aggressive Reminder ⚠️</h1>

      {/* Fixed-position Notification Popup */}
      {notification && (
        <div className="fixed top-4 right-4 px-6 py-4 bg-pink-500 text-white rounded-md shadow-md animate-blast flex items-center justify-between z-50">
          <span className="text-lg font-bold">{notification}</span>
          <button onClick={() => setNotification(null)} className="ml-4 text-sm underline text-yellow-200">
            Dismiss 👋
          </button>
        </div>
      )}

      {/* Input for Adding New Tasks */}
      <div className="mt-6 w-full">
        <input
          type="text"
          placeholder="Add a new task... (or don't!)"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <input
          type="time"
          value={newTaskTime}
          onChange={(e) => setNewTaskTime(e.target.value)}
          className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <button
          onClick={addTask}
          className="w-full mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Procrastinate Later 😜
        </button>
        <div>
          {taskList.map((task, index) => (
            <div key={index} className="mt-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-md shadow-md">
              {task.text} - {task.time}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reminder;
