import React from 'react';


class Layout extends React.Component {
    constructor(props, {data}) {
        super(props);

        this.state = {
            rightOpen: true,
            data: data
        }
    }

    toggleSidebar = (event) => {
        let key = `${event.currentTarget.parentNode.id}Open`;
        this.setState({[key]: !this.state[key]});
    }

    render() {
        let rightOpen = this.state.rightOpen ? 'open' : 'closed';

        return (
            <div id='layout'>
                <div id='right' className={rightOpen}>
                    <div className='icon'
                         onClick={this.toggleSidebar}>
                        &equiv;
                    </div>
                    <div className={`sidebar ${rightOpen}`}>
                        <div className='header'>
                            <h3 className='title'>
                                Right header
                            </h3>
                        </div>
                        <div className='content'>
                            <h3>Right content</h3><br/>
                            <p>
                                {this.data.id}
                            </p>
                            <p>
                                {this.data.title}
                            </p>
                            <p>
                                {this.data.author}
                            </p>
                            <p>
                                {this.data.intro}
                            </p>

                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Layout;