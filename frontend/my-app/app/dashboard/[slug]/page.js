"use client"
import React from 'react';
import axios from 'axios';
import { useState } from "react";
import { useEffect } from "react";
import moment from "moment";

let attendance = [];
let student = [];
let details = [];
let rollno = "";
let courses = [];
let final = [];
let week = [];
let attendancefilter = [];
let thead = "";

function componentDidMount() {
        let data ;

        axios.get('http://localhost:8000/attendance_app/attendance/')
        .then(res => {
            data = res.data;
            console.log(data);
            attendance = data;
        })
        .catch(err => {})

    let detail;

        axios.get('http://localhost:8000/attendance_app/')
        .then(res => {
            detail = res.data;
            details = detail;
            console.log(detail);
        })
        .catch(err => {})

    // Get the roll number


    }

function getStud() {
        if( details && attendance){
        details.forEach(item =>{
            if(item.rollno == rollno){
                student = item;
                console.log(item);
            }
        }
    );
    }

    if(attendance && details && student && rollno){
        console.log(student);
    }
    }

function show() {
    thead = "Courses";

    const paths = window
            .location
            .pathname
            .split("/")
            .filter(path => path !== "")[1];

        rollno =paths;
        console.log(paths);


    getStud();
    console.log(student);

    // Current week details
    week = [];
    var currentDate = moment();
    var weekStart = currentDate.clone().startOf('week');
    var weekEnd = currentDate.clone().endOf('week');
    for (var i = 0; i <= 6; i++) {
        let timestamp = moment(weekStart).add(i, 'days').format()
        let ind = timestamp.indexOf("T");
        week.push(timestamp.slice(0,ind));
    }
    console.log(week);

    // Get the student courses
    let course = student.course;
    console.log(course);
    courses = Object.keys(course).map(function (key) { return course[key]; });
    console.log(courses);

    // Filtering attendance
    attendancefilter = [];
    attendance.forEach(item =>{
        if(item.student.toString() == rollno){
            attendancefilter.push(item);
        }
    })

    console.log(attendancefilter);

    // Constructing weekly attendance matrix
    final = [];
    let start = week[0].split("-")[2];
    courses.forEach(code => {
        let element = [code,0,0,0,0,0,0,0];
        attendancefilter.forEach(row => {
            if(row.course.toString() == code){
                let day = row.date.split("-")[2];
                element[day-start+1] = 1;
            }
        })
        final.push(element);
    })
    console.log("Matrix :");
    console.log(final);



}


function Dashboard() {
    const paths = window
            .location
            .pathname
            .split("/")
            .filter(path => path !== "")[1];

        rollno =paths;
        console.log(paths);

    const [, forceRender] = useState(undefined);

    componentDidMount();

    getStud();
    if (attendance && details ){
        getStud();
    }

    function process() {
        show();
        forceRender((prev) => !prev);
    }


    setTimeout(process,1000);


        return (
            <div
                className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
                <div
                    className="bg-cover bg-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 light:hidden ">
                    <img src="https://tailwindcss.com/_next/static/media/hero-dark@90.dba36cdf.jpg" alt=""
                         className="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 light:hidden bg-cover"
                         width="1920"/>
                </div>
                <div
                    className="bg-cover bg-center absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 dark:hidden ">
                    <img src="https://play.tailwindcss.com/img/beams.jpg" alt=""
                         className="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 dark:hidden"
                         width="1920"/>
                </div>
                <div
                    className="absolute inset-0 bg-[url(./img/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
                <div
                    className="relative px-6 pt-10 pb-8 w-4/5 h-full shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:rounded-lg sm:px-10 block p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
                    <div className="relative h-full">
                        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                        <span
                            className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 ">IITK  </span>Attendance
                        </h1>
                        <div className="pt-4"></div>
                        <h4 className="mb-4 text-l font-extrabold leading-none tracking-tight text-gray-900 md:text-xl lg:text-xl dark:text-white">View
                            and mark your Attendance<span
                                className="underline underline-offset-3 decoration-4 decoration-blue-400 dark:decoration-blue-600"> with Face recognition. </span>
                        </h4>
                        <div className="pt-4"></div>
                        {/*<div className="absolute top-0 right-20 h-16 w-16 ...">*/}
                        {/*    <button type="button" onClick={process}*/}
                        {/*            className="relative text-white bg-gradient-to-br to-pink-600 from-sky-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">*/}
                        {/*        View your Attendance*/}
                        {/*        <svg className="rtl:rotate-180 w-7 h-7 ms-2" aria-hidden="true"*/}
                        {/*             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">*/}
                        {/*            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"*/}
                        {/*                  strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>*/}
                        {/*        </svg>*/}
                        {/*    </button>*/}
                        {/*</div>*/}
                    </div>


                    <div id="attendance-table" className="w-full overflow-x-auto">
                        <div className="overflow-hidden min-w-max">
                            <div
                                className="grid grid-cols-8 p-4 text-sm font-medium text-gray-900 bg-gray-100 border-t border-b border-gray-200 gap-x-16 dark:bg-gray-900 dark:border-gray-700 dark:text-white">
                                <div className="flex items-center">{thead}</div>
                                {week.map((day) => <div key={day.id}>{day}</div>)}

                            </div>
                            {
                                final.map((row) =>
                                    <div key={row.id}
                                        className="grid grid-cols-8 px-4 py-5 text-sm text-gray-700 border-b border-gray-200 gap-x-16 dark:border-gray-700">

                                        <div className="text-gray-500 dark:text-gray-400">{row[0]}</div>

                                        {row.map((att) => {
                                                if(att == 1) {
                                                    return(<div key={att.id}>
                                                        <svg className="w-3 h-3 text-green-500" aria-hidden="true"
                                                             xmlns="http://www.w3.org/2000/svg" fill="none"
                                                             viewBox="0 0 16 12">
                                                            <path stroke="currentColor" strokeLinecap="round"
                                                                  strokeLinejoin="round"
                                                                  strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                                                        </svg>
                                                    </div>)
                                                }else if(att == 0) {
                                                    return(<div key={att.id}>
                                                        <svg className="w-3 h-3 text-red-500" aria-hidden="true"
                                                             xmlns="http://www.w3.org/2000/svg" fill="none"
                                                             viewBox="0 0 14 14">
                                                            <path stroke="currentColor" strokeLinecap="round"
                                                                  strokeLinejoin="round"
                                                                  strokeWidth="2"
                                                                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                                        </svg>
                                                    </div>)
                                                }

                                            }
                                        )}

                                    </div>
                                )
                            }
                        </div>
                    </div>

                </div>
            </div>


        );

}

export default Dashboard