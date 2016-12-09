import React from 'react';
import {Link} from 'react-router';

export default class Post extends React.Component {
    constructor(props) {
        super(props);
        this.comments = this.props.comments;

    }

    render()
    {

      
        return (
          <div>
          <div style={{"borderStyle": "groove"}} />
            <div className="row">
              <div className="col-md-10 forceWidth" style={{display: "block"}}>
                {this.comments.map(function(comment)
                  {
                    return (
                      <div key={comment.id}>
                        <div className="panel-body" style={{backgroundColor: "aliceBlue"}}>
                        <div className="col-md-10" style={{width: "100%"}}>
                          <ul className="nav nav-pills">
                            <li role="presentation" className="active">
                              <div className="controls text-wrap">
                                <p className="form-control-static post-text">
                                  {comment.commentText}
                                </p>
                              </div>
                            </li>
                            <li className="pull-right">
                              <a href="/profile.html" className="override-boostrap-hyperlink">{comment.person.fullName}</a>
                            </li>
                          </ul>
                        </div>
                        </div>
                      </div>
                    )
                  }, this)
                }
              </div>
            </div>
          </div>
        )

    }
  }
