import React from "react";
import Container from "./layouts/container";
import Navbar from "./layouts/navbar";

const Login = (props) => {
	return (
		<Container navbar={<Navbar biskuit={props.biskuit} />}>
			<div style={{marginTop: '100px'}}>
                <div>
                    <h4 className="text-center">Login ke sistem</h4>
                </div>
            <form method="POST">
				<div className="mb-3">
					<label for="exampleInputEmail1" className="form-label">
						Username
					</label>
					<input
						type="text"
						className="form-control"
						id="exampleInputEmail1"
						aria-describedby="emailHelp"
                        name="username"
					/>
				</div>
				<div className="mb-3">
					<label for="exampleInputPassword1" className="form-label">
						Password
					</label>
					<input
						type="password"
						className="form-control"
						id="exampleInputPassword1"
                        name="password"
					/>
				</div>
				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
            </div>
		</Container>
	);
};

export default Login;
