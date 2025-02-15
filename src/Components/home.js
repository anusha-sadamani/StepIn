// Import necessary libraries
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

// Home Page Component
function home() {
    return (
        <div>
            <h1>Welcome to StepIn</h1>
            <a href="/login">Login</a> | <a href="/signup">Signup</a>
        </div>
    );
}
export default home;