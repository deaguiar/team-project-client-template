import React from 'react';
import {getAllCommentsForAPost, getUserData} from '../server.js';

export default class SearchResultsComments extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    var comments = getAllCommentsForAPost(this.props.postID);

    if (comments.length > 0)
    {
      return (
        <div>
        <div style={{"borderStyle": "groove"}} />
          <div className="row">
            <div className="col-md-10 forceWidth" style={{display: "block"}}>
              {comments.map(function(comment)
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
                            <a href="/profile.html" className="override-boostrap-hyperlink">{getUserData(comment.user).fullName}</a>
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
