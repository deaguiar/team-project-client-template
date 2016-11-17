import React from 'react';
import Navbar from './navbar'
/* will add these next time and change the body
import {getSettingsData} from '../server.js';
import {getUserData} from '../server.js';
import {Link} from 'react-router';
*/

export default class Index extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    return (
      <div>
      <Navbar />

      <div style={{'paddingTop': 70 + 'px'}}>
      <div className = "container">
           <div className ="row">

     <div className = "col-md-8">
        <div style ={{width: 999 + 'px'}}> </div>
          <img src="img/sample_map.png" width="100%" />
           </div>

      <div className ="col-md-4">
          <div className= "col-md-10 feed-title white">
          <span className="glyphicon glyphicon-pencil"></span>
            <a1>   WHAT ARE PEOPLE SAYING</a1>
          </div>
    <div className="feed-left-side input-group">

    <div className="row">
      <div className="col-md-12 feed">
        <ul className="feed-list">

         <div className="feed-left feed-top">
         </div>
      <div className="feed-body">
          <span className="glyphicon glyphicon-map-marker"></span>
        <a href="#">JSMith</a>: Post goes here....!!!
      </div>
    <div className="col-md-12 vote-bar">
      <div className="btn-group pull-right" role="group">
      <button type="button" className="btn btn-xs white">
      <span className="glyphicon glyphicon-menu-up"></span>44
      </button>
      <button type="button" className="btn btn-xs white">
      <span className="glyphicon glyphicon-menu-down"></span>44
       </button>
        </div>
      </div>


      <div className="feed-body">
          <span className="glyphicon glyphicon-map-marker"></span>
        <a href="#">JWalker</a>: POST HERE!!!!!
    </div>
      <div className="col-md-12 vote-bar">
    <div className="btn-group pull-right" role="group">
    <button type="button" className="btn btn-xs white">
    <span className="glyphicon glyphicon-menu-up"></span>45
    </button>
    <button type="button" className="btn btn-xs white">
    <span className="glyphicon glyphicon-menu-down"></span>2
     </button>
      </div>
    </div>


    <div className="feed-body">
        <span className="glyphicon glyphicon-map-marker"></span>
        <a href="#">HRAguiar</a>: Great Umass win yesterday!
      </div>
    <div className="col-md-12 vote-bar">
      <div className="btn-group pull-right" role="group">
      <button type="button" className="btn btn-xs white">
      <span className="glyphicon glyphicon-menu-up"></span>12000
      </button>
      <button type="button" className="btn btn-xs white">
      <span className="glyphicon glyphicon-menu-down"></span>1000
       </button>
        </div>
      </div>

    <div className="feed-body">
        <span className="glyphicon glyphicon-map-marker"></span>
        <a href="#">Sam Sung</a>: POST GOES HERE!
      </div>
      <div className="col-md-12 vote-bar">
      <div className="btn-group pull-right" role="group">
      <button type="button" className="btn btn-xs white">
      <span className="glyphicon glyphicon-menu-up"></span>200
      </button>
      <button type="button" className="btn btn-xs white">
      <span className="glyphicon glyphicon-menu-down"></span>100
       </button>
        </div>
      </div>


    <div className="feed-body">
        <span className="glyphicon glyphicon-map-marker"></span>
        <a href="#">KoSilva</a>: POST GOES HERE!
      </div>

      <div className="col-md-12 vote-bar">
      <div className="btn-group pull-right" role="group">
      <button type="button" className="btn btn-xs white">
      <span className="glyphicon glyphicon-menu-up"></span>120
      </button>
      <button type="button" className="btn btn-xs white">
      <span className="glyphicon glyphicon-menu-down"></span>10
       </button>
        </div>
      </div>


    <div className="feed-body">
        <span className="glyphicon glyphicon-map-marker"></span>
        <a href="#">JJ</a>: POST GOES HERE!
      </div>
      <div className="col-md-12 vote-bar">
      <div className="btn-group pull-right" role="group">
      <button type="button" className="btn btn-xs white">
      <span className="glyphicon glyphicon-menu-up"></span>  32
      </button>
      <button type="button" className="btn btn-xs white">
      <span className="glyphicon glyphicon-menu-down"></span>12
       </button>
        </div>
      </div>

     <div className="media-left media-top">
       <span className="glyphicon glyphicon-map-marker"></span>
     </div>
       <div className="media-body">
         <a href="#">George Lucas</a>: The new Star Wars movie sucks!
       </div>

       <div className="col-md-12 vote-bar">
       <div className="btn-group pull-right" role="group">
       <button type="button" className="btn btn-xs white">
       <span className="glyphicon glyphicon-menu-up"></span>10
       </button>
       <button type="button" className="btn btn-xs white">
       <span className="glyphicon glyphicon-menu-down"></span>1
        </button>
         </div>
       </div>


        </ul>
     </div>
        </div>
         </div>

    <div className ="row">
      <div className ="col-md-9 post-section">
           <div className="media-footer">
          <div className="input-group">
        <input type="text" className="form-control"
        placeholder="Post here....">
            <span className="input-group-btn">
           <button type="button" className="btn btn-default">
                   <span className="glyphicon glyphicon-map-marker"></span>
                 </button>
                      </span>
                      </input>
                    </div>
                   </div>
                </div>
            </div>


            </div>
              </div>
                </div>

      </div>
      </div>
    )  }
}
