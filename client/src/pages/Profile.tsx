import { Input, Option, Select } from "@material-tailwind/react";
import React, { useState } from "react";
import { Button, Modal } from "../common";
import PlusCircleIcon from "@heroicons/react/24/solid/PlusCircleIcon";
import { DeleteIcon, EditIcon } from "../svg";
import User from "../utils/User";
import { UserInfoType } from "../types";
import { post } from "../service";
import { useLoader } from "../contexts/LoaderContext";

const LOGGEDIN_USER = {
  fullname: "",
  _id: "",
  email: "",
  roleType: 1,
  phone: "",
  gender: "",
  username: "",
};

type TempTicketGuest = {
  name: string;
  age: string;
  gender: string;
};

const Profile: React.FC = () => {
  const { setLoading } = useLoader();
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingNewGuest, setIsAddingNewGuest] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editRowData, setEditRowData] = useState<number | null>(null);
  const [userInfo, setUserInfo] = useState<Omit<UserInfoType, "token">>(
    User.user || LOGGEDIN_USER
  );
  const [tempUser, setTempUser] = useState<TempTicketGuest>({
    name: "",
    age: "",
    gender: "",
  });
  const [tempUserList, setTempUserList] = useState<TemplateStringsArray[]>([]);
  const [newUser, setNewUser] = useState({ name: "", age: "", gender: "" });
  const [userList, setUserList] = useState([
    {
      name: "Creative Associate",
      age: "30",
      gender: "Male",
    },
  ]);
  const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const toggleEdit = () => setIsEditing(!isEditing);

  const handleUserChange = (
    field: keyof Omit<UserInfoType, "token">,
    value: string
  ) => {
    setUserInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNewUserChange = (field: string, value: string) => {
    setNewUser({ ...newUser, [field]: value });
  };

  const addUser = () => {
    if (newUser.name && newUser.age && newUser.gender) {
      setUserList([...userList, newUser]);
      setNewUser({ name: "", age: "", gender: "" });
      setIsAdding(false);
    }
  };

  const cancelAddUser = () => {
    setNewUser({ name: "", age: "", gender: "" });
    setIsAdding(false);
  };

  const deleteUser = (index: number) => {
    setUserList(userList.filter((_, i) => i !== index));
  };

  const saveEditRow = (
    index: number,
    updatedUser: { name: string; age: string; gender: string }
  ) => {
    const updatedList = [...userList];
    updatedList[index] = updatedUser;
    setUserList(updatedList);
    setEditingRowIndex(null);
  };

  const cancelEditRow = () => {
    setEditingRowIndex(null);
  };

  const handleUpdateUser = async () => {
    const tempUser: any = userInfo;
    delete tempUser?.token;
    try {
      const response = await post(
        `users/update-user/${userInfo._id}`,
        tempUser,
        {},
        {
          showSuccess: true,
          setLoading,
        }
      );
      console.log(response);
    } catch (error) {}
  };
  return (
    <section>
      <div className="px-2 h-[2px] bg-primary transition-all duration-300 ease-in-out" />
      <div className="mx-auto p-6 w-full">
        <div className="flex flex-col lg:flex-row rounded-lg shadow-lg">
          {/* Left Section */}
          <div
            className={`lg:w-1/3 p-6 ${
              isEditing
                ? ""
                : "border-b lg:border-r lg:border-b-0 border-gray-200"
            }`}
          >
            <div className="text-center lg:text-left">
              {isEditing ? (
                <Input
                  crossOrigin={""}
                  variant={"static"}
                  color={"blue"}
                  type="text"
                  name={"fullname"}
                  id={"fullname"}
                  value={userInfo.fullname}
                  onChange={(e) => handleUserChange("fullname", e.target.value)}
                />
              ) : (
                <h1 className="mt-4 text-2xl font-semibold">
                  {userInfo.fullname}
                </h1>
              )}
            </div>
            <div className="mt-6">
              <h2 className="text-lg font-medium">About</h2>
              <ul className="mt-4 text-sm space-y-2">
                <li>
                  <strong>Phone:</strong>
                  {isEditing ? (
                    <Input
                      crossOrigin={""}
                      type="text"
                      variant={"static"}
                      value={userInfo.phone}
                      color={"blue"}
                      onChange={(e) =>
                        handleUserChange("phone", e.target.value)
                      }
                    />
                  ) : (
                    <span> {userInfo.phone}</span>
                  )}
                </li>
                <li>
                  <strong>Email:</strong> {userInfo.email} (Uneditable)
                </li>
              </ul>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-medium">Other Details</h2>
              <ul className="mt-4 text-sm space-y-2">
                <li>
                  <strong>Gender:</strong>
                  {isEditing ? (
                    <Select
                      variant={"static"}
                      color={"blue"}
                      value={userInfo.gender}
                      placeholder="Select gender"
                      onChange={(value) =>
                        handleUserChange("gender", value || "")
                      }
                    >
                      {["Male", "Female", "Other"].map((gender) => (
                        <Option key={gender} value={gender}>
                          {gender}
                        </Option>
                      ))}
                    </Select>
                  ) : (
                    <span> {userInfo.gender}</span>
                  )}
                </li>
                <li>
                  <strong>Username:</strong>
                  {isEditing ? (
                    <Input
                      crossOrigin={""}
                      color="blue"
                      type="text"
                      value={userInfo.username}
                      variant={"static"}
                      onChange={(e) =>
                        handleUserChange("username", e.target.value)
                      }
                    />
                  ) : (
                    <span> {userInfo.username}</span>
                  )}
                </li>
              </ul>
            </div>
            <div className="mt-6 text-right">
              {isEditing ? (
                <>
                  <Button
                    onClick={() => {
                      setUserInfo(User.user || LOGGEDIN_USER);
                      toggleEdit();
                    }}
                    className="mr-2"
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleUpdateUser}>Save</Button>
                </>
              ) : (
                <Button onClick={toggleEdit}>
                  <EditIcon />
                </Button>
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className="lg:w-2/3 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">
                User Info for Quick Ticket
              </h2>
              <Button onClick={() => setIsAdding(true)}>
                <PlusCircleIcon className="h-6 w-6" />
              </Button>
            </div>
            {isAdding && (
              <div className="mt-4 flex space-x-3 overflow-auto">
                <Input
                  crossOrigin={""}
                  variant="static"
                  color="blue"
                  type="text"
                  placeholder="Name"
                  value={newUser.name}
                  onChange={(e) => handleNewUserChange("name", e.target.value)}
                  className="rounded-md p-2"
                />
                <Select
                  variant={"static"}
                  color={"blue"}
                  placeholder="Select gender"
                  value={newUser.gender}
                  onChange={(value) =>
                    handleNewUserChange("gender", value || "")
                  }
                >
                  {["Male", "Female", "Other"].map((gender) => (
                    <Option key={gender} value={gender}>
                      {gender}
                    </Option>
                  ))}
                </Select>
                <Input
                  crossOrigin={""}
                  variant="static"
                  type="text"
                  placeholder="age"
                  value={newUser.age}
                  color="blue"
                  onChange={(e) => handleNewUserChange("age", e.target.value)}
                />
                <div className="block d-flex">
                  <Button onClick={addUser}>Add</Button>
                  <Button onClick={cancelAddUser}>Cancel</Button>
                </div>
              </div>
            )}
            <div className="mt-4 overflow-auto border-b">
              <table className="table-auto w-full text-sm text-left border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 border-b border-gray-200">Name</th>
                    <th className="px-4 py-2 border-b border-gray-200">Age</th>
                    <th className="px-4 py-2 border-b border-gray-200">
                      Gender
                    </th>
                    <th className="px-4 py-2 border-b border-gray-200">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {userList.map((user, index) => (
                    <tr key={index}>
                      {editingRowIndex === index ? (
                        <>
                          <td className="px-4 py-2 border-b">
                            <Input
                              crossOrigin={""}
                              variant="static"
                              color={"blue"}
                              type="text"
                              value={user.name}
                              onChange={(e) =>
                                setUserList((prev) => {
                                  const updated = [...prev];
                                  updated[index] = {
                                    ...updated[index],
                                    name: e.target.value,
                                  };
                                  return updated;
                                })
                              }
                              className=" p-1"
                            />
                          </td>
                          <td className="px-4 py-2 border-b">
                            <Input
                              crossOrigin={""}
                              variant="static"
                              color={"blue"}
                              type="text"
                              value={user.age}
                              onChange={(e) =>
                                setUserList((prev) => {
                                  const updated = [...prev];
                                  updated[index] = {
                                    ...updated[index],
                                    age: e.target.value,
                                  };
                                  return updated;
                                })
                              }
                              className="p-1"
                            />
                          </td>
                          <td className="px-4 py-2 border-b">
                            <Select
                              variant={"static"}
                              color={"blue"}
                              placeholder="Select gender"
                              value={user.gender}
                              className="p-1 z-50"
                              onChange={(value) =>
                                setUserList((prev) => {
                                  const updated = [...prev];
                                  updated[index] = {
                                    ...updated[index],
                                    gender: value || "",
                                  };
                                  return updated;
                                })
                              }
                            >
                              {["Male", "Female", "Other"].map((gender) => (
                                <Option key={gender} value={gender}>
                                  {gender}
                                </Option>
                              ))}
                            </Select>
                          </td>
                          <td className="px-4 py-2 border-b flex space-x-2">
                            <Button
                              onClick={() =>
                                saveEditRow(index, userList[index])
                              }
                            >
                              Save
                            </Button>
                            <Button onClick={cancelEditRow}>Cancel</Button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-4 py-2 border-b">{user.name}</td>
                          <td className="px-4 py-2 border-b">{user.age}</td>
                          <td className="px-4 py-2 border-b">{user.gender}</td>
                          <td className="px-4 py-2 border-b flex space-x-2">
                            <Button onClick={() => setEditingRowIndex(index)}>
                              <EditIcon />
                            </Button>
                            <Button onClick={() => deleteUser(index)}>
                              <DeleteIcon />
                            </Button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Actions */}
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow"
                onClick={() => console.log("Navigate to Change Password")}
              >
                Change Password
              </Button>
              <Button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow"
                onClick={() => console.log("Perform Logout API")}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={showModal}
        handleClose={() => setShowModal(false)}
        size="sm"
        showConfirm={true}
        confirmBtnName={"Save"}
        title=""
        disableFooter={false}
        showCloseIcon={false}
      >
        {""}
      </Modal>
    </section>
  );
};

export default Profile;
