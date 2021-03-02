// import React from "react";
// import CRUDTable, {CreateForm, DeleteForm, Field, Fields, UpdateForm} from "react-crud-table";
// import './Register.scss'
//
//
// // import React, { useState, useRef, useEffect } from "react";
// // import Form from "react-validation/build/form";
// // import Input from "react-validation/build/input";
// // import CheckButton from "react-validation/build/button";
// // import { isEmail } from "validator";
// //
//
// import AuthService from "../../services/auth.service";
// import UserService from "../../services/users.service"
//
// let users = UserService.getUsers().then(res => res)
//
// // let users = [
// //   {
// //     id: 1,
// //     firstname: 'Jon',
// //     lastname: 'Champ'
// //   },
// //   {
// //     id: 2,
// //     firstname: 'Mike',
// //     lastname: 'Ehrmantraut'
// //   }
// // ]
//
// const DescriptionRenderer = ({ field }) => <textarea {...field} />;
// const rolesRenderer = ({field}) =>
//   <select {...field}>
//       <option value='designer'>Designer</option>
//       <option value='technical'>Technical</option>
//       <option value='admin'>Admin</option>
//   </select>;
//
// const SORTERS = {
//   NUMBER_ASCENDING: mapper => (a, b) => mapper(a) - mapper(b),
//   NUMBER_DESCENDING: mapper => (a, b) => mapper(b) - mapper(a),
//   STRING_ASCENDING: mapper => (a, b) => mapper(a).localeCompare(mapper(b)),
//   STRING_DESCENDING: mapper => (a, b) => mapper(b).localeCompare(mapper(a)),
// };
//
// const getSorter = (data) => {
//   const mapper = x => x[data.field];
//   let sorter = SORTERS.STRING_ASCENDING(mapper);
//
//   if (data.field === 'id') {
//     sorter = data.direction === 'ascending' ?
//       SORTERS.NUMBER_ASCENDING(mapper) : SORTERS.NUMBER_DESCENDING(mapper);
//   } else {
//     sorter = data.direction === 'ascending' ?
//       SORTERS.STRING_ASCENDING(mapper) : SORTERS.STRING_DESCENDING(mapper);
//   }
//
//   return sorter;
// };
//
//
// let count = users.length;
// const service = {
//   fetchItems: async (payload) => {
//     let result = Array.from(await users);
//     result = result.sort(getSorter(payload.sort));
//     return Promise.resolve(result);
//   },
//   create: (user) => {
//     let tempUser = user;
//     tempUser.roles = [user.roles]
//     console.log("TEMP", tempUser)
//     AuthService.registerUser(tempUser).then(
//       (response) => {
//         // setMessage(response.data.message);
//         // setSuccessful(true);
//       },
//       (error) => {
//         // const resMessage =
//         //   (error.response &&
//         //     error.response.data &&
//         //     error.response.data.message) ||
//         //   error.message ||
//         //   error.toString();
//
//         // setMessage(resMessage);
//         // setSuccessful(false);
//       }
//     );
//     users.push({
//       ...user,
//       id: count,
//     });
//     return Promise.resolve(user);
//   },
//   update: (data) => {
//     const user = users.find(t => t.id === data.id);
//     user.firstname = data.firstname;
//     user.lastname = data.lastname;
//     return Promise.resolve(user);
//   },
//   delete: (data) => {
//     const user = users.find(t => t.id === data.id);
//     users = users.filter(t => t.id !== user.id);
//     return Promise.resolve(user);
//   },
// };
//
// const styles = {
//   container: {margin: 'auto', width: 'fit-content'},
// };
//
//
// const Register = props => {
//   return (
//     <div style={styles.container}>
//       <CRUDTable
//         caption="Users"
//         fetchItems={payload => service.fetchItems(payload)}
//       >
//         <Fields>
//           <Field
//             name="id"
//             label="Id"
//             hideInCreateForm
//             readOnly
//           />
//           <Field
//             name="firstname"
//             label="First Name"
//             placeholder="First Name"
//           />
//           <Field
//             name="lastname"
//             label="Last Name"
//             placeholder="Last Name"
//             render={DescriptionRenderer}
//           />
//           <Field
//             name="email"
//             label="Email"
//             placeholder="Email"
//           />
//           <Field
//             name="password"
//             label="Password"
//             placeholder="Password"
//           />
//           <Field
//             name="roles"
//             label="Role"
//             placeholder="role"
//             render={rolesRenderer}/>
//         </Fields>
//         <CreateForm
//           title="User Creation"
//           message="Create a new user!"
//           trigger="Create User"
//           onSubmit={user => service.create(user)}
//           submitText="Create"
//           validate={(values) => {
//             const errors = {};
//             if (!values.firstname) {
//               errors.firstname = 'Please, provide the user\'s first name';
//             }
//
//             if (!values.lastname) {
//               errors.lastname = 'Please, provide the user\'s last name';
//             }
//
//             return errors;
//           }}
//         />
//
//         <UpdateForm
//           title="User Update Process"
//           message="Update User"
//           trigger="Update"
//           onSubmit={user => service.update(user)}
//           submitText="Update"
//           validate={(values) => {
//             const errors = {};
//
//             if (!values.id) {
//               errors.id = 'Please, provide id';
//             }
//
//             if (!values.firstname) {
//               errors.firstname = 'Please, provide the user\'s first name';
//             }
//
//             if (!values.lastname) {
//               errors.lastname = 'Please, provide the user\'s last name';
//             }
//
//             return errors;
//           }}
//         />
//
//         <DeleteForm
//           title="User Delete Process"
//           message="Are you sure you want to delete the user?"
//           trigger="Delete"
//           onSubmit={user => service.delete(user)}
//           submitText="Delete"
//           validate={(values) => {
//             const errors = {};
//             if (!values.id) {
//               errors.id = 'Please, provide id';
//             }
//             return errors;
//           }}
//         />
//       </CRUDTable>
//     </div>
//   )
// }
//
// Register.propTypes = {}

import React, {useEffect, useState} from "react";
import {useAsync} from 'react-async';
import UserService from "../../services/users.service";
import {Box, Container, Flex, Grid, GridItem} from "@chakra-ui/layout";
import {Input, useBreakpointValue} from "@chakra-ui/react"
import './Register.scss'
import UserCount from "./UserCount/UserCount";
import UserTable from "./UserTable/UserTable";
import {looseIncludes} from '../../services/util.service'
import {InputGroup, InputRightElement} from "@chakra-ui/input";
import {AddIcon, SearchIcon} from "@chakra-ui/icons";

const Register = props => {
  const {data, error, isLoading} = useAsync({promiseFn: UserService.example})
  const [userSearch, setUserSearch] = useState('')
  const [filteredUsers, setFilteredUsers] = useState([])
  const showUserCount = useBreakpointValue({base: false, 'md': true})

  const handleUserInputChange = (event) => {
    setUserSearch(event.target.value)
  }

  useEffect(() => {
    console.log('happy')
    const d = UserService.example()
  }, [])

  useEffect(() => {
    if (data) {
      return (userSearch !== '')
        ? setFilteredUsers(looseIncludes(data.data, ['firstname', 'lastname', 'email'], userSearch))
        : setFilteredUsers(data.data)
    }
  }, [data, userSearch])


  if (isLoading) return "Loading..."
  if (error) return `Something went wrong: ${error.message}`
  if (data)
    return (
      <Container maxW="3xl" marginTop={12} marginBottom={12}>
        <Flex direction='column'>
          <Box mb={2}>
            <Flex>
              <InputGroup>
              <Input autoFocus={true} value={userSearch} onChange={handleUserInputChange}
                     placeholder='Search users by name or email'
                     bg={'white'}/>
                     <InputRightElement children={<SearchIcon />} />
              </InputGroup>
            </Flex>
          </Box>
          {/*<Divider mt={4} mb={2} />*/}
          {/*gap={4} templateColumns="repeat(7, 1fr)"*/}
          <Grid templateColumns={showUserCount ? 'repeat(6, 1fr)' : 'repeat(5, 1fr)'}>
            {showUserCount ?
              <GridItem colSpan={1} >
                <UserCount filteredUsers={filteredUsers}/>
              </GridItem>
              :
              <></>
            }
            <GridItem colSpan={5} >
              <UserTable filteredUsers={filteredUsers}/>
            </GridItem>
          </Grid>
        </Flex>
      </Container>
    )
}

export default Register;
//
//
// const required = (value) => {
//     if (!value) {
//         return (
//             <div className="alert alert-danger" role="alert">
//                 This field is required!
//             </div>
//         );
//     }
// };
//
// const validEmail = (value) => {
//     if (!isEmail(value)) {
//         return (
//             <div className="alert alert-danger" role="alert">
//                 This is not a valid email.
//             </div>
//         );
//     }
// };
//
// const vfirstname = (value) => {
//     if (value.length < 3 || value.length > 20) {
//         return (
//             <div className="alert alert-danger" role="alert">
//                 Your name must be between 3 and 20 characters.
//             </div>
//         );
//     }
// };
//
// const vlastname = (value) => {
//     if (value.length < 3 || value.length > 20) {
//         return (
//             <div className="alert alert-danger" role="alert">
//                 Your last name must be between 3 and 20 characters.
//             </div>
//         );
//     }
// };
//
// const vpassword = (value) => {
//     if (value.length < 6 || value.length > 40) {
//         return (
//             <div className="alert alert-danger" role="alert">
//                 The password must be between 6 and 40 characters.
//             </div>
//         );
//     }
// };
//
// const Register = (props) => {
//     const form = useRef();
//     const checkBtn = useRef();
//
//
//     const [firstname, setfirstname] = useState("");
//     const [lastname, setlastname] = useState("");
//     const [roles, setRoles] = useState([]);
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [successful, setSuccessful] = useState(false);
//     const [message, setMessage] = useState("");
//
//     const onChangefirstname = (e) => {
//         const firstname = e.target.value;
//         setfirstname(firstname);
//     };
//
//     const onChangelastname = (e) => {
//         const lastname = e.target.value;
//         setlastname(lastname);
//     };
//
//     const onChangeEmail = (e) => {
//         const email = e.target.value;
//         setEmail(email);
//     };
//
//     const onChangePassword = (e) => {
//         const password = e.target.value;
//         setPassword(password);
//     };
//
//     const onChangeRole = (e) => {
//         let index;
//         // check if the check box is checked or unchecked
//         if (e.target.checked) {
//             // add the numerical value of the checkbox to options array
//             roles.push(e.target.value)
//         } else {
//             // or remove the value from the unchecked checkbox from the array
//             index = roles.indexOf(e.target.value)
//             roles.splice(index, 1)
//         }
//         console.log(roles);
//         setRoles(roles);
//
//     };
//
//     const handleRegister = (e) => {
//         e.preventDefault();
//
//         setMessage("");
//         setSuccessful(false);
//
//         form.current.validateAll();
//
// };
//
//     const [content, setContent] = useState("");
//
//
//     useEffect(() => {
//         UserService.getAdminBoard().then(
//             (response) => {
//                 setContent(
//                     <div className="col-md-12">
//                     <div className="card card-container">
//                         <img
//                             src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
//                             alt="profile-img"
//                             className="profile-img-card"
//                         />
//
//                         <Form onSubmit={handleRegister} ref={form}>
//                             {!successful && (
//                                 <div>
//
//                                     <div className="form-group">
//                                         <label htmlFor="firstname">firstname</label>
//                                         <Input
//                                             type="text"
//                                             className="form-control"
//                                             name="firstname"
//                                             value={firstname}
//                                             onChange={onChangefirstname}
//                                             validations={[required, vfirstname]}
//                                         />
//                                     </div>
//
//                                     <div className="form-group">
//                                         <label htmlFor="lastname">lastname</label>
//                                         <Input
//                                             type="text"
//                                             className="form-control"
//                                             name="lastname"
//                                             value={lastname}
//                                             onChange={onChangelastname}
//                                             validations={[required, vlastname]}
//                                         />
//                                     </div>
//
//                                     <div className="form-group">
//                                         <label htmlFor="email">Email</label>
//                                         <Input
//                                             type="text"
//                                             className="form-control"
//                                             name="new-user-email"
//                                             value={email}
//                                             onChange={onChangeEmail}
//                                             validations={[required, validEmail]}
//                                         />
//                                     </div>
//
//                                     <div className="form-group">
//                                         <label htmlFor="password">Password</label>
//                                         <Input
//                                             type="password"
//                                             className="form-control"
//                                             name="new-user-password"
//                                             value={password}
//                                             onChange={onChangePassword}
//                                             validations={[required, vpassword]}
//                                         />
//                                     </div>
//
//                                     <div>
//                                         <input type="checkbox" name="role" value="designer" onChange={onChangeRole}/> designer
//                                         <input type="checkbox" name="role" value="technical" onChange={onChangeRole}/> technical
//                                         <input type="checkbox" name="role" value="admin" onChange={onChangeRole}/> admin
//                                     </div>
//
//                                     <div className="form-group">
//                                         <button className="btn btn-primary btn-block">Sign Up</button>
//                                     </div>
//                                 </div>
//                             )}
//
//                             {message && (
//                                 <div className="form-group">
//                                     <div
//                                         className={ successful ? "alert alert-success" : "alert alert-danger" }
//                                         role="alert"
//                                     >
//                                         {message}
//                                     </div>
//                                 </div>
//                             )}
//                             <CheckButton style={{ display: "none" }} ref={checkBtn} />
//                         </Form>
//                     </div>
//                 </div>);
//             },
//             (error) => {
//                 const _content =
//                     (error.response &&
//                         error.response.data &&
//                         error.response.data.message) ||
//                     error.message ||
//                     error.toString();
//
//                 setContent(_content);
//             }
//         );
//     }, []);
//
//     return (
//         <div className="col-md-12">
//             <div className="card card-container">
//                 <img
//                     src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
//                     alt="profile-img"
//                     className="profile-img-card"
//                 />
//
//                 <Form onSubmit={handleRegister} ref={form}>
//                     {!successful && (
//                         <div>
//
//                             <div className="form-group">
//                                 <label htmlFor="firstname">firstname</label>
//                                 <Input
//                                     type="text"
//                                     className="form-control"
//                                     name="firstname"
//                                     value={firstname}
//                                     onChange={onChangefirstname}
//                                     validations={[required, vfirstname]}
//                                 />
//                             </div>
//
//                             <div className="form-group">
//                                 <label htmlFor="lastname">lastname</label>
//                                 <Input
//                                     type="text"
//                                     className="form-control"
//                                     name="lastname"
//                                     value={lastname}
//                                     onChange={onChangelastname}
//                                     validations={[required, vlastname]}
//                                 />
//                             </div>
//
//                             <div className="form-group">
//                                 <label htmlFor="email">Email</label>
//                                 <Input
//                                     type="text"
//                                     className="form-control"
//                                     name="email"
//                                     value={email}
//                                     onChange={onChangeEmail}
//                                     validations={[required, validEmail]}
//                                 />
//                             </div>
//
//                             <div className="form-group">
//                                 <label htmlFor="password">Password</label>
//                                 <Input
//                                     type="password"
//                                     className="form-control"
//                                     name="password"
//                                     value={password}
//                                     onChange={onChangePassword}
//                                     validations={[required, vpassword]}
//                                 />
//                             </div>
//
//                             <div>
//                                 <input type="checkbox" name="role" value="designer" onChange={onChangeRole}/> designer
//                                 <input type="checkbox" name="role" value="technical" onChange={onChangeRole}/> technical
//                                 <input type="checkbox" name="role" value="admin" onChange={onChangeRole}/> admin
//                             </div>
//
//                             <div className="form-group">
//                                 <button className="btn btn-primary btn-block">Sign Up</button>
//                             </div>
//                         </div>
//                     )}
//
//                     {message && (
//                         <div className="form-group">
//                             <div
//                                 className={ successful ? "alert alert-success" : "alert alert-danger" }
//                                 role="alert"
//                             >
//                                 {message}
//                             </div>
//                         </div>
//                     )}
//                     <CheckButton style={{ display: "none" }} ref={checkBtn} />
//                 </Form>
//             </div>
//         </div>
//         );
// };
//
// export default Register;