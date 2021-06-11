import React from "react";
import api from "../../config/api";
import ReactPaginate from "react-paginate";

export default class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      pageCount: 0,
      loading: false,
    };
  }

  componentDidMount = () => this.getUserList(0);

  getUserList = (page) => {
    this.setState({ loading: true });
    api({
      url: `https://api.instantwebtools.net/v1/passenger?page=${page}&size=10`,
      method: "get",
    })
      .then((res) => {
        console.log(res.data);
        this.setState({
          users: res.data.data,
          pageCount: res.data.totalPages,
        });
        this.setState({ loading: false });
      })
      .catch((err) => {
        console.log(err.message);
        this.setState({ loading: false });
      });
  };

  renderUserCard = (user) => {
    let line = user.airline.id ? user.airline : user.airline[0]
    return (
      <tr key={user._id}>
        <img src={line.logo} alt="" height={25} />
        <td> {user.name} </td>
        <td> {user.trips} </td>
        <td> {line.country} </td>
        <td> {line.name} </td>
        <td> <a href={line.website} target="_black">{line.website}</a></td>
      </tr>
    );
  };

  render() {
    return (
      <div className="container">
        <h1>Users List</h1>
        {this.state.loading && (
          <h5>Loading...</h5>
        )}
        {!this.state.loading && (
          <table className="user-table">
            <thead>
              <tr>
                <th>Logo</th>
                <th>Name</th>
                <th>Trips</th>
                <th>Country</th>
                <th>Airline</th>
                <th>Website</th>
              </tr>
            </thead>
            <tbody>
              {this.state.users.map((user) => {
                return this.renderUserCard(user);
              })}
            </tbody>
          </table>
        )}
        <ReactPaginate
          pageCount={this.state.pageCount}
          pageRangeDisplayed={4}
          onPageChange={(selectedItem) =>
            this.getUserList(selectedItem.selected)
          }
          containerClassName="pagination"
          pageClassName="page-item"
          activeClassName="active-page-item"
          activeLinkClassName="active-link-page-item"
          previousClassName="previous"
          nextClassName="next"
          previousLinkClassName="previous-link"
          nextLinkClassName="next-link"
          disabledClassName="disabled"
        />
      </div>
    );
  }
}
