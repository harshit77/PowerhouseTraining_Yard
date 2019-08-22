import React from 'react';
import '../css/index.css';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import { Divider } from '@material-ui/core';
import {Link} from 'react-router-dom';

class SearchList extends React.Component {
  
    render() {
        console.log(this.props.customers);
        return (
            <div>
                {this.props.customers.length==0 && <div style={{textAlign:'center',fontSize:30}}>No Result Found</div>}
                { this.props.customers.length!=0 && this.props.customers.map((customer,index)=>(
                    <Link to={`userDetails/${customer.id}`} key={customer.id}>
                    <article className="listContainer">
                    <section className="leftListSection">
                        <div> <Avatar alt="Remy Sharp" src="/images/index1.png" className="avatar" /></div>
                        <div className="centerAlign">{customer.firstName} {customer.lastName}</div>
                    </section>
                    <section className="middleListSection">
                        <div className="subtext"><div className="subtextHeader">Name </div><div className="subTextContent">{customer.firstName} {customer.lastName}</div></div>
                        <div className="subtext"><div className="subtextHeader">Plan Start Date </div><div className="subTextContent">25/06/2019</div></div>
                        <div className="subtext"><div className="subtextHeader">Plan End Date </div><div className="subTextContent">25/06/2019</div></div>
                        <div className="subtext"><div className="subtextHeader">Phone Number </div><div className="subTextContent">{customer.phoneNumber}</div></div>
    
                        <Divider  style={{margin:'20px 0 0 0',width:'95%'}}/>
                        <div className={customer.status==="ACTIVE" ? "activeStatus mblayout": (customer.status==="DANGER" ? "dangerStatus mblayout": "deactiveStatus mblayout")}>
                            {customer.status}
                        </div>
                    </section>
                    <section className="rightListSection">
                    <Chip className="status"
                           avatar={<Avatar alt="Natacha" src="/images/index.jpg" />}
                            label="Active"
                            clickable
                            color="primary"
                            />
                    </section>
                    </article>
                    </Link>
                ))}
                
                
            </div>
        )
    }
}
export default SearchList;