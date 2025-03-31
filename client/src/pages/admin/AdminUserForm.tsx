import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Grid,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { get, post, put } from "../../service";
import { successPopup } from "../../utils/errors/alerts";

interface UserFormData {
  _id?: string;
  fullname: string;
  email: string;
  username: string;
  phone: string;
  gender: string;
  roleType: number;
  password?: string;
}

const initialState: UserFormData = {
  fullname: "",
  email: "",
  username: "",
  phone: "",
  gender: "",
  roleType: 1,
  password: "",
};

const AdminUserForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [user, setUser] = useState<UserFormData>(initialState);
  const [errors, setErrors] = useState<{ password?: string }>({});

  useEffect(() => {
    if (isEdit && id) {
      fetchUser();
    } else {
      setUser(() => initialState);
    }
  }, [isEdit, id]);

  const fetchUser = async () => {
    const response = await get<{
      data: UserFormData;
    }>(`users/admin/${id}`);
    if (response.data.data) {
      setUser(response.data.data);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const validatePassword = (password: string) => {
    const pattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,15}$/;
    return pattern.test(password);
  };

  const handleSubmit = async () => {
    if (!isEdit && user.password && !validatePassword(user.password)) {
      setErrors({
        password:
          "Password must be 8-15 characters, including uppercase, lowercase, number & special char.",
      });
      return;
    }
    try {
      if (isEdit) {
        const { password, ...payload } = user;
        await put(`users/admin/${id}`, payload);
      } else {
        await post("users/admin/add", user);
      }
      successPopup(
        `${isEdit ? "Updated user successfully" : "Added user successfully"}`
      );
      navigate("/admin/users");
    } catch (err) {
      console.error("Error saving user", err);
    }
  };

  return (
    <Box maxWidth="lg" mx="auto" px={2} py={4}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          {isEdit ? "Edit User" : "Add New User"}
        </Typography>

        <Typography variant="subtitle1" mb={2} fontWeight={500}>
          User Details
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Full Name"
              name="fullname"
              value={user.fullname}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Email"
              name="email"
              value={user.email}
              onChange={handleChange}
              fullWidth
              disabled={isEdit}
              InputProps={{ readOnly: isEdit }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Username"
              name="username"
              value={user.username}
              onChange={handleChange}
              fullWidth
              disabled={isEdit}
              InputProps={{ readOnly: isEdit }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Phone"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select
                name="gender"
                value={user.gender}
                onChange={(e) =>
                  handleChange(e as React.ChangeEvent<HTMLInputElement>)
                }
                label="Gender"
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Others">Others</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Role Type</InputLabel>
              <Select
                name="roleType"
                value={user.roleType}
                onChange={(e) =>
                  handleChange(e as React.ChangeEvent<HTMLInputElement>)
                }
                label="Role Type"
              >
                <MenuItem value={0}>Admin</MenuItem>
                <MenuItem value={1}>Normal User</MenuItem>
                <MenuItem value={2}>Captain</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        {!isEdit && (
          <Grid item xs={12} md={6} marginTop={2}>
            <TextField
              name="password"
              type="password"
              label="Password"
              fullWidth
              value={user.password}
              onChange={handleChange}
              error={Boolean(errors.password)}
              helperText={errors.password}
            />
          </Grid>
        )}
        <Stack direction="row" spacing={2} mt={4} justifyContent="flex-end">
          <Button
            onClick={() => navigate("/admin/users")}
            variant="outlined"
            color="inherit"
          >
            Cancel
          </Button>
          <Button variant="contained" color="success" onClick={handleSubmit}>
            {isEdit ? "Update User" : "Save User"}
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default AdminUserForm;
