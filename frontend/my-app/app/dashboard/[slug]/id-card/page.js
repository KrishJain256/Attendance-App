"use client"
import Image from 'next/image';
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

let details = [];
let rollno = "";
let paths  = "";
let student = [];
let idpath = "";

function componentDidMount() {

    let detail;

        axios.get('http://localhost:8000/attendance_app/mark')
        .then(res => {
            detail = res.data;
            details = detail;
            console.log(detail);
        })
        .catch(err => {})

}

function getStud() {
        if(details){
        details.forEach(item =>{
            if(item.rollno == rollno){
                student = item;
                console.log(item);
                idpath = item.pfp.toString();
                console.log(idpath);
            }
        });
    }
}

function process1() {
    componentDidMount();
    getStud();
}

export default function IDcard() {
    const [, forceRender] = useState(undefined)

    process1();
    function process() {
        getStud();
    if(student.length>0){
        process2();
    }
}

    function process2() {
        idpath = student.pfp.toString();
        console.log(idpath);
        forceRender((prev) => !prev);
}
    componentDidMount();
    process()

    useEffect(() => {
        // Get the roll number
    paths = location
            .pathname
            .split("/")
            .filter(path => path !== "")[1];
        rollno =paths;
        console.log(paths);
    },[])


    getStud();
    setTimeout(process,2000);


  return (
    <Image
      src={idpath}
      width={500}
      height={500}
      alt="ID Card Image"
    />
  )
}