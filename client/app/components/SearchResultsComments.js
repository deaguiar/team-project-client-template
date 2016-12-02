import React from 'react';

export default class SearchResultsComments extends React.Component
{
  constructor(props)
  {
    super(props);
    this.comments = this.props.comments;
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
