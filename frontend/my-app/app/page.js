"use client"
import Image from "next/image";
import React, {useEffect} from 'react';
import { setState } from 'react';
import axios from 'axios';
import './globals.css';
import { useRouter } from 'next/navigation';
import { useState } from "react";
import Page from "@/app/dashboard/[slug]/page";

// export default function Login() {
//     const [rollno, setRollno] = useState("");
//     const [passwd, setPasswd] = useState("");
//     const [flag, setFlag] = useState(0);
//     const [err, setError] = useState("");
//     const [details, setDetails] = useState()
//
//
//     return (
//
//     );
// }
//

function withnavigator(Component) {
  return function WrappedComponent(props) {
    const router = useRouter();
    return <Component {...props} navrouter={router}/>;
  }
}

class App extends React.Component {

    state = {
        details : [],
        rollno : "",
        passwd : "",
        flag : 0,
        err : "",
    }

    componentDidMount() {

        let data ;

        axios.get('http://localhost:8000/attendance_app/')
        .then(res => {
            data = res.data;
            this.setState({
                details : data
            });
        })
        .catch(err => {})

    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        // Authentication Algo
        console.log(this.state.rollno);
        console.log(this.state.passwd);

        this.state.details.forEach(item => {
            if(item.rollno == this.state.rollno){
                if(item.password == this.state.passwd){
                    console.log("Success!");
                    this.setState({
                        flag : 1,
                        err : "",
                    });
                    this.state.flag = 1;
                    this.state.err = "";
                    // this.props.useeffector(() => {
                    //   this.props.navigator("../dashboard",{replace: true});
                    // },[])
                    // this.props.navigator.push("../dashboard");
                    // window.location.href = "http://localhost:3000/dashboard/";
                    this.props.navrouter.push("/dashboard/" + this.state.rollno);
                }
            }
        })

        if(this.state.flag == 0){
            this.setState({
                err : "Username and password incorrect !! Try again ",
            });
        }

        // this.setState({
        //             rollno : "",
        //             passwd : "",
        //         });

        // axios
        //     .post("http://localhost:8000/wel/", {
        //         name: this.state.user,
        //         detail: this.state.quote,
        //     })
        //     .then((res) => {
        //         this.setState({
        //             user: "",
        //             quote: "",
        //         });
        //     })
        //     .catch((err) => {});
    };




  render() {
    return (
      <div class="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
          <img src="https://play.tailwindcss.com/img/beams.jpg" alt=""
               class="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2" width="1308"/>
          <div
              class="absolute inset-0 bg-[url(./img/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
          <div
              class="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
              <div class="mx-auto max-w-md">
                  <div class="divide-y divide-gray-300/50">
                      <div class="space-y-6 py-8 text-base leading-7 text-gray-600">
                          <h1 className="text-5xl font-extrabold text-blue-700">Login</h1>
                          <form onSubmit={this.handleSubmit}>
                              <label htmlFor="website-admin"
                                     className="block mb-2 text-sm font-medium text-gray-900 ">Roll No.</label>
                              <div className="flex">
    <span
        className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md ">
      <svg className="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
           fill="currentColor" viewBox="0 0 20 20">
        <path
            d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
      </svg>
    </span>
                                  <input type="text" id="website-admin"
                                         className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  "
                                         name="rollno"
                                      // value={this.state.rollno}
                                         onChange={this.handleInput}
                                         placeholder="Enter Roll no."
                                  />
                              </div>
                              <br/>
                              <label htmlFor="website-admin"
                                     className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                              <div className="flex">
    <span
        className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md ">
      <svg className="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
           fill="currentColor" viewBox="0 0 20 20">
        <path
            d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
      </svg>
    </span>
                                  <input type="text" id="website-admin"
                                         className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  "
                                         name="passwd"
                                      // value={this.state.rollno}
                                         onChange={this.handleInput}
                                         placeholder="Enter Password"
                                  />
                              </div>
                              <div className="pt-8 text-base font-semibold leading-7">
                                  {this.state.err &&
                                      <div style={{paddingBottom: 10}}><h6
                                          class="font-bold text-red-700">{this.state.err}</h6>
                                      </div>}
                                  <button type="submit"
                                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Login
                                  </button>

                              </div>
                              {/*<p>*/}
                              {/*    Don't have an account? <Link to="/register">Register</Link>*/}
                              {/*</p>*/}
                          </form>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    );
  }
}

export default withnavigator(App);