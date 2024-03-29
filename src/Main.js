import React, { useReducer, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import BookingPage from "./BookingPage";
import ConfirmedBooking from "./ConfirmedBooking";

const seededRandom = function (seed) {
    var m = 2 ** 35 - 31;
    var a = 185852;
    var s = seed % m;
    return function () {
        return (s = (s * a) % m) / m;
    };
};

const fetchAPI = function (date) {
    let result = [];
    let random = seededRandom(date.getDate());

    for (let i = 17; i <= 23; i++) {
        if (random() < 0.5) {
            result.push(i + ":00");
        }
        if (random() < 0.5) {
            result.push(i + ":30");
        }
    }
    return result;
};

function Main() {
    const updateTimes = (state, action) => {
        switch (action.type) {
            case "updatebooking":
                const date = new Date(action.payload);
                console.log(fetchAPI(date));
                return { ...state };
            default:
                return initializeTimes();
        }
    };

    const [isSubmitted, setIsSubmitted] = useState(false);

    const submitAPI = function (e, formData) {
        e.preventDefault();
        setIsSubmitted(true);
        return true;
    };

    const date = new Date();
    const initializeTimes = () => {
        return fetchAPI(date);
    };
    const [availableTimes, dispatch] = useReducer(
        updateTimes,
        initializeTimes()
    );
    return (
        <main className="main">
            <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route
                    path="/booking"
                    element={
                        <BookingPage
                            availableTimes={availableTimes}
                            dispatcher={(val) => dispatch(val)}
                            submitAPI={submitAPI}
                        />
                    }
                ></Route>
                {isSubmitted && (
                    <Route
                        path="/confimed"
                        element={<ConfirmedBooking />}
                    ></Route>
                )}
            </Routes>
        </main>
    );
}

export default Main;
