// import { useState } from "react";
// import { logout, useAuth } from "../../firebase";
// import { Card, Button } from "react-bootstrap";
// import { Link } from "react-router-dom";

// export default function LogOut() {
  
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const currentUser = useAuth();

//   async function handleLogout() {
//     setLoading(true);
//     try {
//       await logout();
//     } catch {
//       alert("Error!");
//     }
//     setLoading(false);
//   }

//   return (
//     <div className="w-100" style={{ maxWidth: "400px" }}>
//       <Card>
//         <Card.Body>
//           <Link to="/login">
//             <Button disabled={loading || !currentUser} onClick={handleLogout} className="w-100 mt-4" type="submit">
//               Log Out
//             </Button>
//             </Link>
//         </Card.Body>
//       </Card>
//     </div>
//   );
// }