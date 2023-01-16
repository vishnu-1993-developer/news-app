import React, { Component } from 'react';

export class Loader extends Component{
    constructor() {
        super();
    }
    render () {
        return (
            <><div className="container" style={{position:'fixed',height:'100vh',zIndex:9999,right:0,background:'rgba(0,0,0,0.7)'}}>
                <div style={{position:'relative',top:'30vh',left:0,right:0,marginLeft:'auto',marginRight:'auto',color:'#fff',fontSize:'35px'}}>
                    <div className="text-center">
                        <div className="spinner-border" role="status">
                        </div>
                    </div>
                    <div className="text-center">
                        <strong>Loading...</strong>
                    </div>
                </div>
            </div>
            </>
        )
    }
}

export default Loader;