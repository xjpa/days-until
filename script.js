function loadEvents() {
  const events = JSON.parse(localStorage.getItem('eventsList')) || [];
  events.sort((a, b) => new Date(a.date) - new Date(b.date));
  const eventListElement = document.getElementById('eventList');
  eventListElement.innerHTML = '';

  events.forEach((event, index) => {
    const targetDate = new Date(event.date);
    const daysLeftMessage = getDaysLeftMessage(targetDate);
    const eventItem = document.createElement('div');

    eventItem.innerHTML = `
            <div style="font-size: larger; background-color: whitesmoke">${
              event.name
            }<br>
            <span style="font-size: smaller;"><sub>${daysLeftMessage} ${targetDate.toDateString()}</sub></span><br>
            <div id="notes-${index}" contenteditable="true" style="font-size: smaller; margin-top: 5px;">${
      event.notes || 'Click to add notes'
    }</div>
            <button onclick="saveNotes(${index})">Save Notes</button>
            <button onclick="deleteEvent(${index})" style="margin-left: 10px; ">Delete Event</button></div>
        `;

    eventListElement.appendChild(eventItem);
  });
}

function getDaysLeftMessage(targetDate) {
  const currentDate = new Date();
  const differenceInTime = targetDate - currentDate;
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

  if (differenceInDays < 0) {
    return '<strong>The date has already passed!</strong>';
  } else if (differenceInDays === 0) {
    return "<strong>It's today!</strong>";
  } else {
    return `<strong>${differenceInDays} day(s)</strong> left until`;
  }
}

function addEvent() {
  const eventNameInput = document.getElementById('eventName').value.trim();
  const eventDateInput = document.getElementById('eventDate').value;

  if (eventNameInput && eventDateInput) {
    const events = JSON.parse(localStorage.getItem('eventsList')) || [];
    events.push({ name: eventNameInput, date: eventDateInput, notes: '' });
    localStorage.setItem('eventsList', JSON.stringify(events));
    loadEvents();
  } else {
    alert('Please enter both an event name and a date.');
  }
}

function saveNotes(index) {
  const notesElement = document.getElementById(`notes-${index}`);
  const updatedNotes = notesElement.innerText.trim();
  const events = JSON.parse(localStorage.getItem('eventsList')) || [];

  if (events[index]) {
    events[index].notes = updatedNotes;
    localStorage.setItem('eventsList', JSON.stringify(events));
    loadEvents();
  } else {
    alert("Couldn't find the event to update notes.");
  }
}

function deleteEvent(index) {
  const events = JSON.parse(localStorage.getItem('eventsList')) || [];
  events.splice(index, 1);
  localStorage.setItem('eventsList', JSON.stringify(events));
  loadEvents();
}

window.onload = loadEvents;
