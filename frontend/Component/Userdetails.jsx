import React from 'react';

const UserDetails = ({name,email,phone,created_at}) => {
   
    return (
        <table className="table-fixed">
            <thead>
                <tr>
                    <th>name</th>
                    <th>Email</th>
                    <th>Phonenumber</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>{phone}</td>
                    <td>{created_at}</td>
                </tr>
            
            </tbody>
        </table>
    );
}

export default UserDetails;