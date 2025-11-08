import React, { useMemo, useState } from "react";
import "./App.css";
import floorplanImg from "./floorplan.jpeg"; // make sure name/path matches

// Desks + rooms positions in % of image
const RESOURCES = [
  // Top row desks (adjust x/y as needed)
  { id: "desk-t-01", type: "desk", label: "Desk T01", x: 8, y: 18 },
  { id: "desk-t-02", type: "desk", label: "Desk T02", x: 13, y: 18 },
  { id: "desk-t-03", type: "desk", label: "Desk T03", x: 18, y: 18 },
  { id: "desk-t-04", type: "desk", label: "Desk T04", x: 23, y: 18 },
  { id: "desk-t-05", type: "desk", label: "Desk T05", x: 28, y: 18 },

  // Bottom row desks
  { id: "desk-b-01", type: "desk", label: "Desk B01", x: 8, y: 78 },
  { id: "desk-b-02", type: "desk", label: "Desk B02", x: 13, y: 78 },
  { id: "desk-b-03", type: "desk", label: "Desk B03", x: 18, y: 78 },
  { id: "desk-b-04", type: "desk", label: "Desk B04", x: 23, y: 78 },
  { id: "desk-b-05", type: "desk", label: "Desk B05", x: 28, y: 78 },

  // Meeting rooms on the right
  { id: "room-1", type: "room", label: "Meeting Room 1", x: 90, y: 50 },
  { id: "room-2", type: "room", label: "Meeting Room 2", x: 96, y: 50 },
  { id: "room-3", type: "room", label: "Board Room", x: 90, y: 60 },
];

function makeBookingKey(resourceId, dateStr) {
  return `${resourceId}_${dateStr}`;
}

function App() {
  const [selectedResourceId, setSelectedResourceId] = useState(
    RESOURCES[0]?.id
  );
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10) // YYYY-MM-DD
  );
  const [zoom, setZoom] = useState(1);
  const [bookings, setBookings] = useState({}); // { key: {resourceId, date, user} }

  const selectedResource = useMemo(
    () => RESOURCES.find((r) => r.id === selectedResourceId),
    [selectedResourceId]
  );

  const isSelectedBooked = useMemo(() => {
    if (!selectedResource) return false;
    const key = makeBookingKey(selectedResource.id, selectedDate);
    return Boolean(bookings[key]);
  }, [selectedResource, bookings, selectedDate]);

  const handleBook = () => {
    if (!selectedResource || !selectedDate) return;
    const key = makeBookingKey(selectedResource.id, selectedDate);

    if (bookings[key]) {
      alert("This resource is already booked for that day.");
      return;
    }

    const userName = "You"; // replace with actual user later
    setBookings((prev) => ({
      ...prev,
      [key]: {
        resourceId: selectedResource.id,
        date: selectedDate,
        user: userName,
      },
    }));
  };

  const handleCancel = () => {
    if (!selectedResource || !selectedDate) return;
    const key = makeBookingKey(selectedResource.id, selectedDate);
    if (!bookings[key]) return;

    const copy = { ...bookings };
    delete copy[key];
    setBookings(copy);
  };

  const handleZoomChange = (delta) => {
    setZoom((z) => {
      const next = Math.min(2.5, Math.max(0.7, z + delta));
      return Number(next.toFixed(2));
    });
  };

  return (
    <div className="app">
      <div className="map-wrapper">
        <h1 className="map-title">Office Planner</h1>

        <div className="layout">
          {/* LEFT – MAP */}
          <div className="map-card">
            <div className="map-toolbar">
              <span className="toolbar-label">Zoom</span>
              <button onClick={() => handleZoomChange(-0.1)}>-</button>
              <span className="zoom-label">{Math.round(zoom * 100)}%</span>
              <button onClick={() => handleZoomChange(0.1)}>+</button>
            </div>

            <div className="map-viewport">
              <div className="map-inner" style={{ transform: `scale(${zoom})` }}>
                <img
                  src={floorplanImg}
                  alt="Office floorplan"
                  className="map-image"
                />

                {RESOURCES.map((res) => {
                  const key = makeBookingKey(res.id, selectedDate);
                  const isBooked = Boolean(bookings[key]);
                  const isSelected = res.id === selectedResourceId;

                  return (
                    <button
                      key={res.id}
                      className={[
                        "resource-pin",
                        `resource-${res.type}`,
                        isBooked ? "resource-booked" : "resource-free",
                        isSelected ? "resource-selected" : "",
                      ].join(" ")}
                      style={{
                        left: `${res.x}%`,
                        top: `${res.y}%`,
                      }}
                      onClick={() => setSelectedResourceId(res.id)}
                      title={`${res.label} • ${
                        isBooked ? "Booked" : "Available"
                      }`}
                    >
                      <span className="resource-pin-label">
                        {res.type === "desk" ? "D" : "R"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT – BOOKING PANEL */}
          <aside className="booking-card">
            <h2>Booking</h2>

            {selectedResource ? (
              <>
                <div className="booking-section">
                  <p className="booking-label">Selected</p>
                  <p className="booking-value">
                    <strong>{selectedResource.label}</strong>{" "}
                    <span className="badge">
                      {selectedResource.type === "desk"
                        ? "Desk"
                        : "Meeting Room"}
                    </span>
                  </p>
                </div>

                <div className="booking-section">
                  <label className="booking-label" htmlFor="date">
                    Date
                  </label>
                  <input
                    id="date"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>

                <div className="booking-section">
                  <p className="booking-label">Status</p>
                  <p
                    className={
                      "booking-status " +
                      (isSelectedBooked ? "status-booked" : "status-free")
                    }
                  >
                    {isSelectedBooked
                      ? "Booked for this date"
                      : "Available for this date"}
                  </p>
                </div>

                <div className="booking-actions">
                  <button
                    className="primary-btn"
                    onClick={handleBook}
                    disabled={isSelectedBooked}
                  >
                    Book
                  </button>
                  <button
                    className="secondary-btn"
                    onClick={handleCancel}
                    disabled={!isSelectedBooked}
                  >
                    Cancel
                  </button>
                </div>

                <p className="hint">
                  Zoom in and click other desks or rooms on the map to change
                  the selection.
                </p>
              </>
            ) : (
              <p>Select a desk or room on the map.</p>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}

export default App;
