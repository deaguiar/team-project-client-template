import React from 'react';
import {getUserData} from '../server.js';

export default class SearchResultsComments extends React.Component
{
  constructor(props)
  {
    super(props);
    this.comments = this.props.comments;
    this.parentPostID = this.props.postID;
    this.author = "000000000000000000000003";
  }


  submit(event)
  {
    // we know the post is being done async at the same time on the server, 
    // but we can load the comment client side in the meantime to be fast
    if (this.refs.comment.value !== "")
    {
      var newComment = {
        _id: this.refs.author.value,
        commentText: this.refs.comment.value,
        id: this.comments.length
      };

      // now we gotta get the user data async
      getUserData(this.refs.author.value, function(data, t)
      {
        newComment.person = data;
        t.comments.push(newComment);
        // reset the text field to be empty to prevent spam (at least a little bit, cant autosubmit with enter with an empty text field)
        // theoretically if we were building an actual site we would limit #comments per minute server side
        t.refs.comment.value = "";
        // now rerender just the comments section
        t.forceUpdate();
      }, this);
    }
    else
    {
      event.preventDefault();
      alert('You cannot submit an empty comment!');
    }
  }

  render()
  {
    if (this.comments.length > 0)
    {
      //generate the id for each comment, basically does nothing except get rid of a warning
      this.comments.map(function(a,b){ a.id = b; return a;});

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
              <div>
                <form action="/post/comment/" method="post" onSubmit={(e) => this.submit(e)}>
                <input type="hidden" ref="postID" name="postID" value={this.parentPostID}/>
                <input type="hidden" ref="author" name="author" value={this.author}/>
                <input type="hidden" ref="_id" name="_id" value={this.comments.length+1}/>
                <input type="text" ref="comment" name="comment" placeholder="Enter comment here..." style={{width: "95%"}}/>
                <button type="submit" style={{width: "5%"}}>
                    <span className="glyphicon glyphicon-comment"/>
                </button>
                </form> 
              </div>
            </div>
          </div>
        </div>
      )
    }
    else
    {
      return (              
        <div>
                <form action="/post/comment/" method="post" onSubmit={(e) => this.submit(e)}>
                <input type="hidden" ref="postID" name="postID" value={this.parentPostID}/>
                <input type="hidden" ref="author" name="author" value={this.author}/>
                <input type="hidden" ref="_id" name="_id" value={this.comments.length+1}/>
                <input type="text" ref="comment" name="comment" placeholder="Enter comment here..." style={{width: "95%"}}/>
                <button type="submit" style={{width: "5%"}}>
                    <span className="glyphicon glyphicon-comment"/>
                </button>
                </form> 
      </div>)
    }
  }
}
