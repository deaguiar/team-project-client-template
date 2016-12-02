import React from 'react';
import {getAllCommentsForAPost} from '../server.js';

export default class SearchResultsComments extends React.Component
{
  constructor(props)
  {
    super(props);
    this.comments = [];
  }

  setComments(data, t)
  {
    t.posts = data;
    //t.forceUpdate();
  }

  componentDidMount()
  {
    getAllCommentsForAPost(this.props.postID, this.setComments, this);
  }

  render()
  {

    if (this.comments.length > 0)
    {
      return (
        <div>
        <div style={{"borderStyle": "groove"}} />
          <div className="row">
            <div className="col-md-10 forceWidth" style={{display: "block"}}>
              {this.comments.map(function(comment)
                {
                  return (
                    <div>
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
    else
    {
      return (<div>No comments yet!</div>)
    }
  }
}
