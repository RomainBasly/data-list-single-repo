"use client";
import React, {useState, useEffect} from 'react';
import classes from "./classes.module.scss";

export default function Test() {
    const [backendData, setBackendData] = useState({message: ""})
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('http://localhost:8000/api/data')
                const data = await response.json()
                setBackendData(data)
            } catch (error) {
                console.warn(error)
            }
        }
        fetchData()
    }, [])

    return (
        <div className={classes["root"]}>
            <h1>Test</h1>
           {backendData && <p>{backendData.message}</p>}
        </div>
    )
}