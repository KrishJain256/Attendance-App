"use client"
import React from 'react';
import axios from 'axios';
import { useEffect } from "react";
import { useState } from "react";
// import camera from "@/components/custom/camera.js"
import {Button} from "@/components/ui/button";
import { useRef } from "react";
import Image from "next/image";
import * as faceapi from 'face-api.js';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


let student = [];
let details = [];
let rollno = "";
let courses = [];
let thead = "";
let dashlink = "";
let paths  = "";
let idpath = "";
let code = "";
let flag = 0;
let validated = 0;
let err = "";

function componentDidMount() {

    let detail;

        axios.get('http://localhost:8000/attendance_app/mark')
        .then(res => {
            detail = res.data;
            details = detail;
            console.log(detail);
        })
        .catch(err => {})

    paths = location
            .pathname
            .split("/")
            .filter(path => path !== "")[1];
        rollno =paths;
        console.log(paths);
    dashlink = "/dashboard/" + rollno;

}

function getStud() {
        if(details){
        details.forEach(item =>{
            if(item.rollno == rollno){
                student = item;
                console.log(item);
                courses = Object.keys(item.course).map(function (key) { return item.course[key]; });
                console.log(courses);
                idpath = item.pfp.toString();
                console.log(idpath);
            }
        });

    }
}




function MarkAttendance() {
    useEffect(() => {
        // Get the roll number
    paths = location
            .pathname
            .split("/")
            .filter(path => path !== "")[1];
        rollno =paths;
        console.log(paths);
    dashlink = "/dashboard/" + rollno;
    },[])

    componentDidMount();
    const [, forceRender] = useState(undefined);

    function process() {
    // componentDidMount();
    getStud();
    flag++;
    if(student.length>0){
        process2();
    }
}

function process2() {
    idpath = student.pfp.toString();
    console.log(idpath);
}


    setTimeout(process,2000);

    function force() {
        if(flag == 1){
        flag++;
        forceRender((prev) => !prev)
    }
    }



    const [imageObject, setImageObject] = useState(null);

  const handleFileInput = useRef(null);

  const handleClick = () => {
    handleFileInput.current.click();
  };

  const handleImageChange = (event) => {
    setImageObject({
      imagePreview: URL.createObjectURL(event.target.files[0]),
      imageFile: event.target.files[0],
    });
    // forceRender((prev) => !prev);
    console.log(event.target.files[0]);
  };

const idCardRef = useRef();
    const selfieRef = useRef();
    const isFirstRender = useRef(true);

    function validateImage() {
  //       const renderFace = async (image, x, y, width, height) => {
  //   const canvas = document.createElement("canvas");
  //   canvas.width = width;
  //   canvas.height = height;
  //   const context = canvas.getContext("2d");
  //
  //   context?.drawImage(image, x, y, width, height, 0, 0, width, height);
  //   canvas.toBlob((blob) => {
  //     image.src = URL.createObjectURL(blob);
  //   }, "image/jpeg");
  // };

    //     if (isFirstRender.current) {
    //   isFirstRender.current = false; // toggle flag after first render/mounting
    //   return;
    // }
        (async () => {
      // loading the models
      await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
      await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
      await faceapi.nets.faceExpressionNet.loadFromUri('/models');

      // detect a single face from the ID card image
      const idCardFacedetection = await faceapi.detectSingleFace(idCardRef.current,
        new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks().withFaceDescriptor();

      console.log(idCardFacedetection);

      // detect a single face from the selfie image
      const selfieFacedetection = await faceapi.detectSingleFace(selfieRef.current,
        new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks().withFaceDescriptor();

      console.log(selfieFacedetection);
      if(idCardFacedetection && selfieFacedetection){
        // Using Euclidean distance to comapare face descriptions
        const distance = faceapi.euclideanDistance(idCardFacedetection.descriptor, selfieFacedetection.descriptor);
        console.log(distance);
        if(distance < 0.5){
          console.log("approved");
          validated = 1;
          if(code.length>0){
              console.log("Uploading");



          }
        } else {
          console.log("Not approved");
        }
      }

    })();


  }

    function setcourse(e) {
        code = e.target.value;

    }

  function handleSubmit(e){
        e.preventDefault();
        let check = 0;
        courses.forEach((item) => {
            if(item == code){
                check = 1;
            }
        })
        if(check == 0){
            code = "";
            console.log("Not your course");
            err = "This Course is not allotted to you. Consider checking the spelling.";
            forceRender((prev) => !prev);
        }
        if(check == 1){
            validateImage();
        }

  }

    return (
            <div
                className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
                {process()}
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


                        <nav className="flex mb-4" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center space-x-1 md:space-x-3 rtl:space-x-reverse">
                                <li className="inline-flex items-center">
                                    <a href={dashlink}
                                       className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                                        <svg className="w-3 h-3 me-2.5" aria-hidden="true"
                                             xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                                        </svg>
                                        Dashboard
                                    </a>
                                </li>
                                <li aria-current="page">
                                    <div className="flex items-center">
                                        <svg className="w-3 h-3 text-gray-400 mx-1 rtl:rotate-180" aria-hidden="true"
                                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                  strokeWidth="2" d="m1 9 4-4-4-4"/>
                                        </svg>
                                        <span
                                            className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">Mark Attendance</span>
                                    </div>
                                </li>
                            </ol>
                        </nav>
                        <div className="pt-4"></div>
                        <h2 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">Mark
                            Attendance</h2>
                        <h4 className="mb-4 text-l font-extrabold leading-none tracking-tight text-gray-900 md:text-xl lg:text-xl dark:text-white">To
                            mark your attendance, please upload a <span
                                className="underline underline-offset-3 decoration-4 decoration-blue-400 dark:decoration-blue-600">LIVE image.</span>
                        </h4>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">Select Course</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {

                                    courses.map((coursecode) =>
                                        <DropdownMenuItem key={coursecode.id} onClick={() => code = coursecode}>
                                            {coursecode}
                                        </DropdownMenuItem>
                                    )
                                }
                                {/*<DropdownMenuItem onClick={() => setTheme("light")}>*/}
                                {/*  Light*/}
                                {/*</DropdownMenuItem>*/}
                                {/*<DropdownMenuItem onClick={() => setTheme("dark")}>*/}
                                {/*  Dark*/}
                                {/*</DropdownMenuItem>*/}
                                {/*<DropdownMenuItem onClick={() => setTheme("system")}>*/}
                                {/*  System*/}
                                {/*</DropdownMenuItem>*/}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Select onOpenChange={force}>
                            <SelectTrigger className="w-[280px]">
                                <SelectValue placeholder="Select Course"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Courses</SelectLabel>
                                    {
                                        courses.map((coursecode) =>
                                            <SelectItem key={coursecode.id} value={coursecode}
                                                        onClick={() => console.log(coursecode)}>
                                                {coursecode}
                                            </SelectItem>
                                        )
                                    }
                                    <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                                    <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
                                    <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
                                    <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                                    <SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
                                    <SelectItem value="hst">Hawaii Standard Time (HST)</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-5">
                                <label htmlFor="course"
                                       className="block mb-2 text-m font-medium text-gray-900 dark:text-white"> Course
                                    :</label>
                                <input type="coursecode" id="coursecode" name="code" onChange={setcourse}
                                       className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                       placeholder="Course Code" required/>
                            </div>
                            <button type='submit'>Submit</button>
                        </form>
                        <div>

                            <button onClick={handleClick}>Upload Photo</button>
                            <label>
                                <input
                                    style={{display: "none"}}
                                    type="file"
                                    accept="image/*"
                                    capture="user"
                                    ref={handleFileInput}
                                    onChange={handleImageChange}
                                />
                            </label>
                            {imageObject &&
                                <img ref={selfieRef} src={imageObject.imagePreview} height={300} width={200}/>}
                        </div>
                        <div>
                            {idpath && < Image src={idpath} ref={idCardRef} alt={"Error in GET IMAGE"} width={200}
                                               height={300}/>}
                        </div>
                    </div>

                    {/*<Button variant="outline" onClick={camera.startCamera}>Start Camera</Button>*/}
                    {/*<Button variant="outline" onClick={camera.takeSnapshot}>Click picture</Button>*/}


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

                </div>


    );
}

export default MarkAttendance