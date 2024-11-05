import React from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from "axios";
import { useState} from 'react';

export default function PlacingForm({ product }) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const today = new Date().toISOString().split('T')[0];

    const [open, setOpen] = useState(false);


    const onSubmit = async (data) => {
        try {
            await axios.post("http://localhost:5000/orders", { ...data, product });
            setOpen(true);
            reset(); 
        } catch (error) {
            console.error("Error submitting form: ", error);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
            <h3>Fill Details to place the order</h3>

            <div className="form-group">
                <TextField
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    {...register("firstName", { required: "First Name is required" })}
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                />
            </div>

            <div className="form-group">
                <TextField
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    {...register("lastName", { required: "Last Name is required" })}
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                />
            </div>

            <div className="form-group">
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: "Please enter a valid email address"
                        }
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />
            </div>

            <div className="form-group">
                <TextField
                    label="Phone Number"
                    variant="outlined"
                    fullWidth
                    {...register("phone", {
                        required: "Phone number is required",
                        pattern: {
                            value: /^[789]\d{9}$/,
                            message: "Phone number must start with 7, 8, or 9 and have 10 digits"
                        }
                    })}
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                />
            </div>

            <div className="form-group">
                <TextField
                    label="Delivery date"
                    type="date"
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{ 
                        inputProps: { min: today } 
                    }}
                    {...register("deliveryDate", {
                        required: "Delivery Date is required",
                        validate: value => new Date(value) >= new Date(today) || "Delivery date cannot be in the past"
                    })}
                    error={!!errors.deliveryDate}
                    helperText={errors.deliveryDate?.message}
                />

            </div>

            <div className="form-group">
                <TextField
                    label="Quantity"
                    variant="outlined"
                    fullWidth
                    type="number"
                    {...register("quantity", {
                        required: "Quantity is required",
                        min: { value: 1, message: "Minimum quantity is 1" },
                        max: { value: 20, message: "Maximum quantity is 20" }
                    })}
                    error={!!errors.quantity}
                    helperText={errors.quantity?.message}
                />
            </div>

            <div className="form-group">
                <TextField
                    label="Address"
                    variant="outlined"
                    fullWidth
                    {...register("address", { required: "Address is required" })}
                    error={!!errors.address}
                    helperText={errors.address?.message}
                />
            </div>

            <div className="form-group">
                <TextField
                    label="City"
                    variant="outlined"
                    fullWidth
                    {...register("city", { required: "City is required" })}
                    error={!!errors.city}
                    helperText={errors.city?.message}
                />
            </div>

            <div className="form-group">
                <TextField
                    label="State"
                    variant="outlined"
                    fullWidth
                    {...register("state", { required: "State is required" })}
                    error={!!errors.state}
                    helperText={errors.state?.message}
                />
            </div>

            <div className="form-group">
                <TextField
                    label="Zip Code"
                    variant="outlined"
                    fullWidth
                    {...register("zip", {
                        required: "Zip Code is required",
                        pattern: {
                            value: /^\d{6}$/,
                            message: "Zip code must be 6 digits"
                        }
                    })}
                    error={!!errors.zip}
                    helperText={errors.zip?.message}
                />
            </div>

            <div className="form-group">
                <Button type="submit" variant="contained" color="primary">Submit</Button>
                <Button variant="outlined"
                color="secondary"
                onClick={() => {
                    reset();
                }}
                style={{ marginLeft: '10px' }}
                >
                Reset
                </Button>
            </div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <MuiAlert variant="filled" onClose={handleClose} severity="success">
                    Order placed successfully!
                </MuiAlert>
            </Snackbar>
        </form>
    );
}
