
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Bar, Doughnut } from 'react-chartjs-2';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'chart.js/auto';
import '../../App.css';
import axios from 'axios';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            date: new Date(),
            eventsCount: 0,
            membersCount: 0,
            guidesCount: 0,
            chartData: {
                labels: [],
                datasets: []
            },
            donutData: {
                labels: [],
                datasets: []
            },
            todos: JSON.parse(localStorage.getItem('todos')) || [],
            newTodo: '',
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(_, prevState) {
        // Update localStorage when todos state changes
        if (prevState.todos !== this.state.todos) {
            localStorage.setItem('todos', JSON.stringify(this.state.todos));
        }
    }

    fetchData = () => {
        const eventsPromise = axios.get('http://localhost/Registrationphp/manage.php?action=fetch_events');
        const membersPromise = axios.get('http://localhost/Registrationphp/manage.php?action=fetch_members');
        const guidesPromise = axios.get('http://localhost/Registrationphp/manage.php?action=fetch_guides');

        Promise.all([eventsPromise, membersPromise, guidesPromise])
            .then(([eventsResponse, membersResponse, guidesResponse]) => {
                const eventsCount = eventsResponse.data.length;
                const membersCount = membersResponse.data.length;
                const guidesCount = guidesResponse.data.length;
                    
                this.setState({ 
                    eventsCount, 
                    membersCount, 
                    guidesCount 
                }, this.updateChart);
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    updateChart = () => {
        const { eventsCount, membersCount, guidesCount } = this.state;
        this.setState({
            chartData: {
                labels: ['Events', 'Members', 'Guides'],
                datasets: [
                    {
                        label: 'Stats',
                        backgroundColor: ['#3498db', '#ffc107', '#dc3545'],
                        data: [eventsCount, membersCount, guidesCount],
                    },
                ],
            },
            donutData: {
                labels: ['Sales', 'Payments'],
                datasets: [
                    {
                        label: 'Sales',
                        data: [eventsCount * membersCount, eventsCount * guidesCount*0.5],
                        backgroundColor: ['#dc3545', '#ffc107'],
                        hoverOffset: 4,
                    },
                ],
            },
        });
    };

    handleDateChange = (date) => {
        this.setState({ date });
    };

    // To-Do List Handlers
    handleAddTodo = () => {
        const { newTodo, todos } = this.state;
        if (newTodo.trim()) {
            const updatedTodos = [...todos, { text: newTodo, completed: false }];
            this.setState({ todos: updatedTodos, newTodo: '' });
        }
    };

    handleTodoChange = (e) => {
        this.setState({ newTodo: e.target.value });
    };

    handleToggleComplete = (index) => {
        const updatedTodos = [...this.state.todos];
        updatedTodos[index].completed = !updatedTodos[index].completed;
        this.setState({ todos: updatedTodos });
    };

    handleDeleteTodo = (index) => {
        const updatedTodos = [...this.state.todos];
        updatedTodos.splice(index, 1);
        this.setState({ todos: updatedTodos });
    };

    render() {
        const { chartData, donutData, todos, newTodo } = this.state;

        return (
            <div className="content-wrapper">
                {/* Content Header */}
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0 text-dark">Dashboard</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item active"><h4>City Clique</h4></li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main content */}
                <section className="content">
                    <div className="container-fluid">
                        {/* Small boxes (Stat box) */}
                        <div className="row">
                            {/* Small Boxes for Events, Guides, Members, Admins */}
                            <div className="col-lg-4 col-6">
                                <div className="card small-box bg-primary">
                                    <div className="inner">
                                        <h3>Events</h3>
                                        <p>Manage Events</p>
                                    </div>
                                    <div className="icon">
                                        <i className="ion ion-clock"></i>
                                    </div>
                                    <Link to="/manageevents" className="small-box-footer">
                                        More info <i className="fas fa-arrow-circle-right"></i>
                                    </Link>
                                </div>
                            </div>

                            <div className="col-lg-4 col-6">
                                <div className="card small-box bg-primary">
                                    <div className="inner">
                                        <h3>Guides</h3>
                                        <p>Manage Guides</p>
                                    </div>
                                    <div className="icon">
                                        <i className="ion ion-pie-graph"></i>
                                    </div>
                                    <Link to="/manageguides" className="small-box-footer">
                                        More info <i className="fas fa-arrow-circle-right"></i>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-lg-4 col-6">
                                <div className="card small-box bg-white">
                                    <div className="inner">
                                        <h3>Members</h3>
                                        <p>Manage Members</p>
                                    </div>
                                    <div className="icon">
                                        <i className="ion ion-person-add"></i>
                                    </div>
                                    <Link to="/managemembers" className="small-box-footer">
                                        More info <i className="fas fa-arrow-circle-right"></i>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-lg-4 col-6">
                                <div className="card small-box bg-warning">
                                    <div className="inner">
                                        <h3>Lookups</h3>
                                        <p>See and manage Lookups</p>
                                    </div>
                                    <div className="icon">
                                        <i className="ion ion-key"></i>
                                    </div>
                                    <Link to="/managecateg" className="small-box-footer">
                                        More info <i className="fas fa-arrow-circle-right"></i>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-lg-4 col-6">
                                <div className="card small-box bg-danger">
                                    <div className="inner">
                                        <h3>Users</h3>
                                        <p>User Registrations</p>
                                    </div>
                                    <div className="icon">
                                        <i className="ion ion-person"></i>
                                    </div>
                                    <Link to="/manageusers" className="small-box-footer">
                                        More info <i className="fas fa-arrow-circle-right"></i>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-lg-4 col-6">
                                <div className="card small-box bg-danger">
                                    <div className="inner">
                                        <h3>Admins</h3>
                                        <p>See and manage admins</p>
                                    </div>
                                    <div className="icon">
                                        <i className="ion ion-gear-a"></i>
                                    </div>
                                    <Link to="/manageadmins" className="small-box-footer">
                                        More info <i className="fas fa-arrow-circle-right"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Bar Chart for Events, Members, Guides */}
                        <div className="row">
                            <div className="col-lg-6 col-md-12">
                                <div className="card card-outline card-danger">
                                    <div className="card-header">
                                        <h3 className="card-title">Overview</h3>
                                    </div>
                                    <div className="card-body">
                                        {chartData.labels.length > 0 ? (
                                            <Bar
                                                data={chartData}
                                                options={{
                                                    maintainAspectRatio: false,
                                                    scales: {
                                                        y: {
                                                            beginAtZero: true,
                                                        },
                                                    },
                                                }}
                                                height={300}
                                            />
                                        ) : (
                                            <p>Loading chart...</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Donut Chart for Sales */}
                            <div className="col-lg-6 col-md-12">
                                <div className="card card-outline card-danger">
                                    <div className="card-header">
                                        <h3 className="card-title">Sales</h3>
                                    </div>
                                    <div className="card-body">
                                        {donutData.labels.length > 0 ? (
                                            <Doughnut
                                                data={donutData}
                                                height={300}
                                                options={{ maintainAspectRatio: false }}
                                            />
                                        ) : (
                                            <p>Loading donut chart...</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* To-Do List */}
                        <div className="row">
                            <div className="col-lg-6 col-md-12">
                                <div className="card card-outline card-primary">
                                    <div className="card-header">
                                        <h3 className="card-title">To-Do List</h3>
                                    </div>
                                    <div className="card-body">
                                        <ul className="todo-list">
                                            {todos.map((todo, index) => (
                                                <li key={index} className={todo.completed ? 'done' : ''}>
                                                    
                                                    <span className="text">{todo.text}</span>
                                                    <div className="tools">
                                                        <button
                                                            onClick={() => this.handleToggleComplete(index)}
                                                            className="btn btn-sm btn-primary mr-2"
                                                        >
                                                            {todo.completed ? 'Undo' : 'Complete'}
                                                        </button>
                                                        <button
                                                            onClick={() => this.handleDeleteTodo(index)}
                                                            className="btn btn-sm btn-danger"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="card-footer">
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Add a new task"
                                                value={newTodo}
                                                onChange={this.handleTodoChange}
                                            />
                                            <span className="input-group-append">
                                                <button className="btn btn-primary" onClick={this.handleAddTodo}>
                                                    Add
                                                </button>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Calendar */}
                            <div className="col-lg-3 col-md-6">
                                <div className="card card-outline card-primary">
                                    <div className="card-header">
                                        <h3 className="card-title">Calendar</h3>
                                    </div>
                                    <div className="card-body m-3">
                                        <Calendar value={this.state.date} onChange={this.handleDateChange} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
   