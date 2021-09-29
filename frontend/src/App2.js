import './App.css';
import React, {useState} from "react";

function App2(){

    function toggleBar() {

        document.getElementById('sidebarCollapse').onclick= function () {
            document.getElementById('sidebar').classList.toggle('active');
        };
    
    };

    var checkReady = function() {   
        document.readyState !== "complete" ? setTimeout(checkReady, 11) : toggleBar();   
    };  
    
    checkReady();  

    return(
        <div className="wrapper">
            <nav className="navbar" id='sidebar'>
            <div className="sidebar-header">
            <h3>Bootstrap Sidebar</h3>
        </div>

        <ul className="list-unstyled components">
            <p>Dummy Heading</p>
            <li className="active">
                <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Home</a>
                <ul className="collapse list-unstyled" id="homeSubmenu">
                    <li>
                        <a href="/#">Sign in</a>
                    </li>
                    <li>
                        <a href="/#">Create a business account</a>
                    </li>
                    
                </ul>
            </li>
            <li>
                <a href="/#">About</a>
            </li>
            <li>
                <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Pages</a>
                <ul className="collapse list-unstyled" id="pageSubmenu">
                    <li>
                        <a href="/#">Page 1</a>
                    </li>
                    <li>
                        <a href="/#">Page 2</a>
                    </li>
                    <li>
                        <a href="/#">Page 3</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="/#">Portfolio</a>
            </li>
            <li>
                <a href="/#">Contact</a>
            </li>
        </ul>
            </nav>
            <div id="content">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <button type="button" id="sidebarCollapse" className="btn btn-info">
                            <i className="fas fa-align-left"></i>
                            <span><button>Menu</button></span>
                        </button>
                    </div>
                </nav>
            </div>






        </div>)
}

export default App2;