"use client"
import Image from "next/image";
import React, {useEffect} from 'react';
import { setState } from 'react';
import axios from 'axios';
import './globals.css';
import { useRouter } from 'next/navigation';
import { useState } from "react";
import Page from "@/app/dashboard/[slug]/page";


let rollno = "" ;
let passwd = "";
let flag = 0;
let err = "";
let details = [];

function componentDidMount() {

        let data;

        axios.get('http://localhost:8000/attendance_app/')
            .then(res => {
                data = res.data;
                console.log(data);
                details = data;
            })
            .catch(err => {
            })

    }

    function Login() {

    const router = useRouter();
    const [, forceRender] = useState(undefined);

    componentDidMount();

    function setrollno(e) {
        rollno = e.target.value;
    }

    function setpasswd(e) {
        passwd = e.target.value;
    }

    function handleSubmit(e) {
        e.preventDefault();

        // Authentication Algo
        console.log(rollno);
        console.log(passwd);

        details.forEach(item => {
            if (item.rollno == rollno) {
                if (item.password == passwd) {
                    console.log("Success!");
                    flag = 1;
                    err = "";
                    // this.state.flag = 1;
                    // this.state.err = "";
                    // this.props.useeffector(() => {
                    //   this.props.navigator("../dashboard",{replace: true});
                    // },[])
                    // this.props.navigator.push("../dashboard");
                    // window.location.href = "http://localhost:3000/dashboard/";
                    let link = "/dashboard/"+rollno;
                    router.push(link,{scroll:false});
                }
                else{
                    flag = 0;
                    err = "Username and password incorrect !! Try again ";
                }
            }
        })
        forceRender((prev) => !prev);
    }



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
                    className="relative px-6 pt-10 pb-8 w-2/5 h-full shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:rounded-lg sm:px-10 block p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
                    <div className="relative h-full">

                        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                            <span
                                className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Login</span>
                        </h1>
                        <div className="pt-5"></div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-5">
                                <label htmlFor="rollno"
                                       className="block mb-2 text-m font-medium text-gray-900 dark:text-white">Roll
                                    No.</label>
                                <input type="rollno" id="rollno" name="rollno" onChange={setrollno}
                                       className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                       placeholder="Roll No." required/>
                            </div>
                            <div className="mb-5">
                                <label htmlFor="password"
                                       className="block mb-2 text-m font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" id="passwd" name="passwd" onChange={setpasswd}
                                       className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                       placeholder="Password" required/>
                            </div>
                            <div className="pt-6"></div>


                            <div className="text-base font-semibold leading-7">

                                <div style={{paddingBottom: 10}}><h6
                                    className="font-bold text-red-700">{err}</h6>
                                </div>
                                <button type="submit"
                                        className="text-white text-xl bg-gradient-to-br to-pink-600 from-sky-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Login
                                    <svg className="rtl:rotate-180 w-5 h-5 ms-2" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                              stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                    </svg>
                                </button>

                            </div>
                            {/*<p>*/}
                            {/*    Don't have an account? <Link to="/register">Register</Link>*/}
                            {/*</p>*/}
                        </form>


                    </div>

                </div>
            </div>

        )
            ;

    }

export default Login

//     function withnavigator(Component) {
//         return function WrappedComponent(props) {
//             const router = useRouter();
//             return <Component {...props} navrouter={router}/>;
//         }
//     }
//
//
//     class App extends React.Component {
//
//         state = {
//             details: [],
//             rollno: "",
//             passwd: "",
//             flag: 0,
//             err: "",
//         }
//
//
//         handleInput = (e) => {
//             this.setState({
//                 [e.target.name]: e.target.value,
//             });
//         };
//
//         handleSubmit = (e) => {
//             e.preventDefault();
//
//             // Authentication Algo
//             console.log(this.state.rollno);
//             console.log(this.state.passwd);
//
//             this.state.details.forEach(item => {
//                 if (item.rollno == this.state.rollno) {
//                     if (item.password == this.state.passwd) {
//                         console.log("Success!");
//                         this.setState({
//                             flag: 1,
//                             err: "",
//                         });
//                         // this.state.flag = 1;
//                         // this.state.err = "";
//                         // this.props.useeffector(() => {
//                         //   this.props.navigator("../dashboard",{replace: true});
//                         // },[])
//                         // this.props.navigator.push("../dashboard");
//                         // window.location.href = "http://localhost:3000/dashboard/";
//                         this.props.navrouter.push("/dashboard/" + this.state.rollno);
//                     }
//                 }
//             })
//
//             if (this.state.flag == 0) {
//                 this.setState({
//                     err: "Username and password incorrect !! Try again ",
//                 });
//             }
//
//             // this.setState({
//             //             rollno : "",
//             //             passwd : "",
//             //         });
//
//             // axios
//             //     .post("http://localhost:8000/wel/", {
//             //         name: this.state.user,
//             //         detail: this.state.quote,
//             //     })
//             //     .then((res) => {
//             //         this.setState({
//             //             user: "",
//             //             quote: "",
//             //         });
//             //     })
//             //     .catch((err) => {});
//         };
//
//
//         render() {
//             return (
//                 <div
//                     class="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
//                     <img src="https://play.tailwindcss.com/img/beams.jpg" alt=""
//                          class="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2" width="1308"/>
//                     <div
//                         class="absolute inset-0 bg-[url(./img/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
//                     <div
//                         class="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
//                         <div class="mx-auto max-w-md">
//                             <div class="divide-y divide-gray-300/50">
//                                 <div class="space-y-6 py-8 text-base leading-7 text-gray-600">
//                                     <h1 className="text-5xl font-extrabold text-blue-700">Login</h1>
//                                     <form onSubmit={this.handleSubmit}>
//                                         <label htmlFor="website-admin"
//                                                className="block mb-2 text-sm font-medium text-gray-900 ">Roll
//                                             No.</label>
//                                         <div className="flex">
//     <span
//         className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md ">
//       <svg className="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
//            fill="currentColor" viewBox="0 0 20 20">
//         <path
//             d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
//       </svg>
//     </span>
//                                             <input type="text" id="website-admin"
//                                                    className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  "
//                                                    name="rollno"
//                                                 // value={this.state.rollno}
//                                                    onChange={this.handleInput}
//                                                    placeholder="Enter Roll no."
//                                             />
//                                         </div>
//                               <br/>
//                               <label htmlFor="website-admin"
//                                      className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
//                               <div className="flex">
//     <span
//         className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md ">
//       <svg className="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
//            fill="currentColor" viewBox="0 0 20 20">
//         <path
//             d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
//       </svg>
//     </span>
//                                   <input type="text" id="website-admin"
//                                          className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  "
//                                          name="passwd"
//                                       // value={this.state.rollno}
//                                          onChange={this.handleInput}
//                                          placeholder="Enter Password"
//                                   />
//                               </div>
//                               <div className="pt-8 text-base font-semibold leading-7">
//                                   {this.state.err &&
//                                       <div style={{paddingBottom: 10}}><h6
//                                           class="font-bold text-red-700">{this.state.err}</h6>
//                                       </div>}
//                                   <button type="submit"
//                                           className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Login
//                                   </button>
//
//                               </div>
//                               {/*<p>*/}
//                               {/*    Don't have an account? <Link to="/register">Register</Link>*/}
//                               {/*</p>*/}
//                           </form>
//                       </div>
//                   </div>
//               </div>
//           </div>
//       </div>
//     );
//   }
// }
//
// export default withnavigator(App);