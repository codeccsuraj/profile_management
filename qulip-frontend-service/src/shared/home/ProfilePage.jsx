import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../context";
import { Link, useParams } from "react-router-dom";

const ProfilePage = () => {
  const { logoutHandler, updateUsers, getUserById } = useAuthContext();
  const [userInfo, setUserInfo] = useState({}); // Initialize as an object
  const { id } = useParams();

  const getUserData = async () => {
    try {
      const result = await getUserById(id);
      setUserInfo(result?.data?.data); // Assuming result.data.data contains the user data
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []); // Include id in the dependency array to reload data if the ID changes

  // Update the editedData when userInfo changes
  const [editedData, setEditedData] = useState({
    firstName: userInfo.firstName || "",
    lastName: userInfo.lastName || "",
    email: userInfo.email || "",
    mobile: userInfo.mobile || "",
  });

  // Sync editedData with userInfo after fetching data
  useEffect(() => {
    if (userInfo.firstName) {
      setEditedData({
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        mobile: userInfo.mobile,
      });
    }
  }, [userInfo]); // Trigger when userInfo changes

  // State to manage edit mode for each field
  const [isEditing, setIsEditing] = useState({
    firstName: false,
    lastName: false,
    email: false,
    mobile: false,
  });

  // Handle input change
  const handleInputChange = (field, value) => {
    setEditedData((prevData) => ({ ...prevData, [field]: value }));
  };

  // Toggle edit mode for a field
  const toggleEditMode = (field) => {
    setIsEditing((prevEditing) => ({ ...prevEditing, [field]: !prevEditing[field] }));
  };

  // Save changes
  const handleSave = async (field) => {
    try {
      await updateUsers(id, { [field]: editedData[field] });
      setIsEditing((prevEditing) => ({ ...prevEditing, [field]: false }));
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="container-sm">
        <div className="row py-4">
          <div className="col-lg-6">
            <h3>Welcome, {userInfo?.firstName || "User"}!</h3>
          </div>
          <div className="col-lg-6 d-flex justify-content-end">
            <button className="btn btn-secondary" onClick={() => logoutHandler()}>
              Logout
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-8">
            {["firstName", "lastName", "email", "mobile"].map((field) => (
              <div className="form-group" key={field}>
                <label className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <div className="input-group d-flex align-items-center gap-2">
                  <input
                    type="text"
                    className="form-control"
                    value={editedData[field] || ""} // Ensure value is never undefined or null
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    disabled={!isEditing[field]}
                  />
                  {isEditing[field] ? (
                    <>
                      <button className="btn btn-primary" onClick={() => handleSave(field)}>
                        Save
                      </button>
                      <button className="btn btn-secondary" onClick={() => toggleEditMode(field)}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <Link className="nav-link text-primary" onClick={() => toggleEditMode(field)}>
                      Edit
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
