"use client"
import React from 'react';
import axios from 'axios';
import { useEffect } from "react";
import { useState } from "react";
// import camera from "@/components/custom/camera.js"
import {Button} from "@/components/ui/button";
import '@tensorflow/tfjs-backend-webgl';
import * as facemesh from '@tensorflow-models/face-landmarks-detection';
import { useRef } from "react";
import Image from "next/image";
import moment from "moment";


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
let timestamp = moment().format();
let ind = timestamp.indexOf("T");
let curdate = timestamp.slice(0,ind);
let success = 0;
let successmsg = "";
let gotimage = 0;

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
    err = "";
    successmsg = "";
    success = 0;
    gotimage = 1;
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

            const refidcardcanvas = document.getElementById("id-card-image");
            const refimagecanvas = document.getElementById("selfie-image");

      // loading the models
            const model = facemesh.SupportedModels.MediaPipeFaceMesh;
const detectorConfig = {
  runtime: 'tfjs', // or 'tfjs'
  solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh',
}
const detector = await facemesh.createDetector(model, detectorConfig);

            const idCardFace = await detector.estimateFaces(refidcardcanvas);
            console.log(idCardFace);

            const selfieFace = await detector.estimateFaces(refimagecanvas);
            console.log(selfieFace);

            if(selfieFace.length>0){
                const idcardlandmarks = idCardFace[0].keypoints;
                const selfielandmarks = selfieFace[0].keypoints;

                console.log(idcardlandmarks);
                console.log(selfielandmarks);

                let euclideanDistance = 0;

                let x_meani = 0;
                let y_meani = 0;
                let x_means = 0;
                let y_means = 0;
                let z_meani = 0;
                let z_means = 0;

                for(let i =0;i<467;i++){
                    x_meani = x_meani + idcardlandmarks[i].x;
                    y_meani = y_meani + idcardlandmarks[i].y;
                    x_means = x_means + selfielandmarks[i].x;
                    y_means = y_means + selfielandmarks[i].y;
                    z_meani = z_meani + idcardlandmarks[i].z;
                    z_means = z_means + selfielandmarks[i].z;

                }

                x_meani =x_meani/468;
                y_meani =y_meani/468;
                x_means =x_means/468;
                y_means =y_means/468;
                z_means =z_means/468;
                z_meani =z_meani/468;

                for(let i = 0;i<467;i++){
                    // if(idcardlandmarks[i].name && selfielandmarks[i].name){
                    //     let xi = idcardlandmarks[i].x -x_meani;
                    //     let yi = idcardlandmarks[i].y - y_meani;
                    //     let zi = idcardlandmarks[i].z-z_meani;
                    //
                    //     let xs = selfielandmarks[i].x - x_means;
                    //     let ys = selfielandmarks[i].y - y_means;
                    //     let zs = selfielandmarks[i].z-z_means;
                    //
                    //     let distance = Math.sqrt(Math.pow(xs - xi, 2) + Math.pow(ys - yi, 2) + Math.pow(zs - zi, 2));
                    //     euclideanDistance = euclideanDistance + distance;
                    // }
                    let xi = idcardlandmarks[i].x -x_meani;
                    let yi = idcardlandmarks[i].y - y_meani;
                    let zi = idcardlandmarks[i].z-z_meani;

                    let xs = selfielandmarks[i].x - x_means;
                    let ys = selfielandmarks[i].y - y_means;
                    let zs = selfielandmarks[i].z-z_means;

                    let distance = Math.sqrt(Math.pow(xs - xi, 2) + Math.pow(ys - yi, 2) + Math.pow(zs - zi, 2));
                    euclideanDistance = euclideanDistance + distance;

                }

                console.log(euclideanDistance);

                if(euclideanDistance < 3000){
                  console.log("approved");
                  validated = 1;
                  if(code.length>0){
                      console.log("Uploading");
                      console.log(curdate);

                    axios.post(
                        "http://localhost:8000/attendance_app/attendance/",
                        {student:rollno,date:curdate,course:code}
                    ).then((res) => {
                        code = "";
                        success = 1;
                        successmsg = "Attendance Marked :) ";
                        forceRender((prev) => !prev);
                    }).catch((err) => {});

                  }



                } else {
                  console.log("Not approved");
                  err = "Face didn't match. Please try again !!";
                  forceRender((prev) => !prev);
                }
            }else {
                console.log("Upload again !!")
                err = "No Face Found! Please upload a better image";
                forceRender((prev) => !prev);
            }



    })();


  }

    function setcourse(e) {
        code = e.target.value;

    }

  function handleSubmit(e){
        e.preventDefault();

      //   const selfiecanvas = document.getElementById("selfie-canvas");
      //   const selfieimage = document.getElementById("selfie-image");
      //   const idcardcanvas = document.getElementById("id-card-canvas");
      //   const idcardimage = document.getElementById("id-card-image");
      //
      // const selfiectx = selfiecanvas.getContext("2d");
      // const idcardctx = idcardcanvas.getContext("2d");
      //
      // selfieimage.addEventListener("load", (e) => {
      //     selfiectx.drawImage(selfieimage, 10, 10);
      // });
      //
      // idcardimage.addEventListener("load",(e) =>{
      //     idcardctx.drawImage(idcardimage,10,10);
      // });

        console.log("Submiting")
        let check = 0;
        courses.forEach((item) => {
            if(item == code){
                check = 1;
            }
        })
        if(check == 0){
            code = "";
            console.log("Not your course");
            err = "This Course is not allotted to you. Consider checking the spelling. ";
            forceRender((prev) => !prev);
        }
        if(gotimage == 0){
            err = err + "Also, NO image was uploaded. Kindly upload an image for authentication.";
            forceRender((prev) => !prev);
        }
        if(check == 1 && gotimage == 1){
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
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <nav className="flex mb-4" aria-label="Breadcrumb">
                                <ol className="inline-flex items-center space-x-1 md:space-x-3 rtl:space-x-reverse">
                                    <li className="inline-flex items-center">
                                        <a href={dashlink}
                                           className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                                            <svg className="w-3 h-3 me-2.5" aria-hidden="true"
                                                 xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                                 viewBox="0 0 20 20">
                                                <path
                                                    d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                                            </svg>
                                            Dashboard
                                        </a>
                                    </li>
                                    <li aria-current="page">
                                        <div className="flex items-center">
                                            <svg className="w-3 h-3 text-gray-400 mx-1 rtl:rotate-180"
                                                 aria-hidden="true"
                                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                <path stroke="currentColor" strokeLinecap="round"
                                                      strokeLinejoin="round"
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

                            <form onSubmit={handleSubmit}>
                                <div className="mb-5">
                                    <label htmlFor="course"
                                           className="block mb-2 text-m font-medium text-gray-900 dark:text-white"> Course
                                        :</label>
                                    <input type="coursecode" id="coursecode" name="code" onChange={setcourse}
                                           className="shadow-sm w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                           placeholder="Course Code" required/>
                                </div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                       htmlFor="user_avatar">Upload file</label>
                                <input
                                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                    aria-describedby="user_avatar_help" id="user_avatar" type="file"
                                    accept="image/*"
                                    capture="user" ref={handleFileInput} onChange={handleImageChange}/>
                                <div className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                                     id="user_avatar_help">This
                                    image will be used for authentication purposes.
                                    Please keep your face at the center of the image ( should be in portrait mode ).
                                </div>
                                <div className="pt-6"></div>
                                <button type="submit"
                                        className="relative text-white bg-gradient-to-br to-pink-600 from-sky-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Mark Attendance
                                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                              strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                    </svg>
                                </button>
                            </form>
                            <div className="pt-6"></div>
                            {err && <h5 className="text-amber-500">{err}</h5>}
                            {successmsg && <div className="pt-5 text-green-500"><h4>{successmsg}</h4></div>}
                        </div>
                        <div>


                            <div
                                className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

                                {imageObject &&
                                    <img crossOrigin="anonymous" ref={selfieRef} id="selfie-image"
                                         src={imageObject.imagePreview}
                                         className="rounded-t-lg w-full"/>
                                }
                                {/*<div className="hidden">*/}
                                {/*    {imageObject &&*/}
                                {/*        <img crossOrigin="anonymous" ref={selfieRef} id="selfie-image" src={imageObject.imagePreview} height={300} width={200}*/}
                                {/*             className="rounded-t-lg w-full"/>*/}
                                {/*    }*/}
                                {/*</div>*/}

                                <div className="p-5">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Uploaded
                                        Image</h5>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Your attendance
                                        will be marked automatically if this is you.</p>
                                </div>
                            </div>
                            {/*<div className="hidden">*/}
                            {/*    {idpath &&*/}
                            {/*        < Image crossOrigin="anonymous" id="id-card-image" src={idpath} alt={"Error in GET IMAGE"} width={200}*/}
                            {/*                height={300}/>*/}
                            {/*    }*/}
                            {/*</div>*/}

                        </div>
                        <div>
                            <div
                                className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

                                {idpath &&
                                    < Image crossOrigin="anonymous" id="id-card-image" src={idpath} ref={idCardRef}
                                            alt={"Error in GET IMAGE"} width={200}
                                            height={300} className="rounded-t-lg w-full"/>
                                }
                                {/*<div className="hidden">*/}
                                {/*    {imageObject &&*/}
                                {/*        <img crossOrigin="anonymous" ref={selfieRef} id="selfie-image" src={imageObject.imagePreview} height={300} width={200}*/}
                                {/*             className="rounded-t-lg w-full"/>*/}
                                {/*    }*/}
                                {/*</div>*/}

                                <div className="p-5">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">ID
                                        Card
                                        Image</h5>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">This is your ID
                                        Card image. Maybe try to look similar ;) </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pt-10"></div>
                    <h5 className="text-amber-500">* Kindly wait for few seconds after Submitting the form. Authentication process starts as soon as you click on the submit button and is expected to take about 10-15 seconds.</h5>
                    <h5 className="text-amber-500">** This feature uses pre-trained models to analyse your face. It may
                        not give proper results at times.</h5>
                    <h5 className="text-amber-500">  If you are sure that your image should get approved. Please try to
                        re-submit it.</h5>


                </div>

                {/*<Button variant="outline" onClick={camera.startCamera}>Start Camera</Button>*/}
                {/*<Button variant="outline" onClick={camera.takeSnapshot}>Click picture</Button>*/}


                {/*<div className="absolute top-0 right-20 h-16 w-16 ...">*/}
                {/*    <button type="button" onClick={process}*/}
                {/*            className="relative text-white bg-gradient-to-br to-pink-600 from-sky-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">*/}
                {/*        View your Attendance*/}
                {/*        <svg className="rtl:rotate-180 w-7 h-7 ms-2" aria-hidden="true"*/}
                {/*                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">*/}
                {/*                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"*/}
                {/*                      strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>*/}
                {/*            </svg>*/}
                {/*        </button>*/}
                {/*    </div>*/}
            </div>

        </div>


    );
}

export default MarkAttendance