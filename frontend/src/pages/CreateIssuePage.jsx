// frontend/src/pages/CreateIssuePage.jsx
import React, { useState, useRef, useEffect } from "react"; // Added useRef and useEffect
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./CreateIssuePage.css";

function CreateIssuePage() {
  const { currentUser, isAuthenticated, isLoading: authIsLoading } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null); // This will hold the File object
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // States for camera functionality
  const [showCamera, setShowCamera] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const videoRef = useRef(null); // To reference the <video> element
  const canvasRef = useRef(null); // To reference the <canvas> element for capturing
  const streamRef = useRef(null); // To store the active media stream

  const issueCategories = [
    "Pothole",
    "Broken Streetlight",
    "Garbage Dump",
    "Water Leakage",
    "Traffic Signal Malfunction",
    "Fallen Tree",
    "Stray Animal Menace",
    "Encroachment",
    "Illegal Parking",
    "Noise Pollution",
    "Open Manhole",
    "Blocked Drainage",
    "Damaged Footpath",
    "Overgrown Vegetation",
    "Street Hawker Nuisance",
    "Vandalism",
    "Construction Waste",
    "Abandoned Vehicle",
    "Air Pollution",
    "Power Outage",
    "Non-functional Public Toilet",
    "Public Urination",
    "Fly Tipping (illegal dumping)",
    "Other",
  ];

  useEffect(() => {
    // Cleanup stream when component unmounts or showCamera becomes false
    return () => {
      stopCameraStream();
    };
  }, []);

  useEffect(() => {
    if (!authIsLoading && !isAuthenticated) {
      navigate("/login", { state: { from: { pathname: "/create-issue" } } });
    }
  }, [authIsLoading, isAuthenticated, navigate]);

  const stopCameraStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const startCamera = async () => {
    stopCameraStream(); // Stop any existing stream
    setCameraError("");
    setImage(null); // Clear any previously uploaded/captured image
    if (document.getElementById("image-upload"))
      document.getElementById("image-upload").value = "";

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        }); // Prioritize rear camera
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setShowCamera(true);
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        setCameraError(
          `Error accessing camera: ${err.name}. Please ensure you've granted permission and try again.`
        );
        setShowCamera(false);
      }
    } else {
      setCameraError("Camera access is not supported by your browser.");
    }
  };

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      // Set canvas dimensions to video dimensions
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert canvas to blob, then to File
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const photoFile = new File(
              [blob],
              `fixourcity_capture_${Date.now()}.jpg`,
              { type: "image/jpeg" }
            );
            setImage(photoFile); // Set the captured photo as the image
            console.log("Photo captured:", photoFile);
          } else {
            console.error("Could not create blob from canvas");
            setCameraError("Failed to capture photo. Please try again.");
          }
        },
        "image/jpeg",
        0.9
      ); // MIME type and quality

      stopCameraStream();
      setShowCamera(false); // Hide camera view after taking photo
    }
  };

  const handleImageChange = (e) => {
    stopCameraStream();
    setShowCamera(false);
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    } else {
      setImage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setLoading(true);

    if (!isAuthenticated || !currentUser) {
      /* ... */
    }
    if (!title || !description || !location || !category) {
      /* ... */
    }

    console.log("Submitting issue:", {
      title,
      description,
      location,
      category,
      imageName: image?.name,
      reportedBy: currentUser.email,
    });
    // ... (rest of simulated or real API call remains the same, it will use the 'image' state which now can be from file upload or camera)
    setTimeout(() => {
      setSuccessMessage(
        `Issue "${title}" reported successfully! You will be redirected shortly.`
      );
      setTitle("");
      setDescription("");
      setLocation("");
      setCategory("");
      setImage(null);
      if (document.getElementById("image-upload"))
        document.getElementById("image-upload").value = "";
      setLoading(false);
      setTimeout(() => navigate("/issues"), 3000);
    }, 1500);
  };

  if (authIsLoading) return <div>Verifying your access...</div>;

  return (
    <div className="create-issue-page">
      <div className="create-issue-container">
        <h2>Report a New Issue</h2>
        {error && <p className="error-message">{error}</p>}
        {cameraError && <p className="error-message">{cameraError}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        {showCamera && (
          <div className="camera-view">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="video-preview"
            ></video>
            <canvas ref={canvasRef} style={{ display: "none" }}></canvas>{" "}
            {/* Hidden canvas */}
            <div className="camera-controls">
              <button
                type="button"
                onClick={takePhoto}
                className="capture-button"
              >
                Take Photo
              </button>
              <button
                type="button"
                onClick={() => {
                  stopCameraStream();
                  setShowCamera(false);
                }}
                className="cancel-camera-button"
              >
                Cancel Camera
              </button>
            </div>
          </div>
        )}

        {!showCamera && (
          <form onSubmit={handleSubmit} className="create-issue-form">
            {/* ... (title, category, description, location form groups) ... */}
            <div className="form-group">
              <label htmlFor="title">Issue Title / Type</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                disabled={loading}
              >
                <option value="" disabled>
                  Select a category
                </option>
                {issueCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="5"
                required
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="location">
                Location (e.g., Address, Landmark)
              </label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="form-group image-upload-options">
              <label>Issue Image (Optional)</label>
              <div className="button-group">
                <label
                  htmlFor="image-upload"
                  className="upload-button-label"
                  role="button"
                  tabIndex="0"
                  onKeyDown={(e) => {
                    if (e.key === "Enter")
                      document.getElementById("image-upload").click();
                  }}
                >
                  Upload File
                </label>
                <input
                  type="file"
                  id="image-upload"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleImageChange}
                  disabled={loading}
                  style={{ display: "none" }} // Hide the default file input
                />
                <span>OR</span>
                <button
                  type="button"
                  onClick={startCamera}
                  disabled={loading}
                  className="capture-live-button"
                >
                  Capture Live Photo
                </button>
              </div>
              {image && (
                <p className="image-preview-name">Selected: {image.name}</p>
              )}
            </div>
            <button
              type="submit"
              className="submit-issue-button"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Report Issue"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
export default CreateIssuePage;