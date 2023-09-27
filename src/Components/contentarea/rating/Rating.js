import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Container, Radio, Rating } from "./RatingStyles";

const Rate = () => {
	const [rate, setRate] = useState(0);
	return (
		<Container>
			{[...Array(5)].map((item, index) => {
				const givenRating = index + 1;
				return (
					<label key={item}>
						<Radio
							type="radio"
							value={givenRating}
							onClick={() => {
								setRate(givenRating);
							}}
						/>
						<Rating>
							<FaStar
								color={
									givenRating < rate || givenRating === rate
										? "gold"
										: "rgb(192,192,192)"
								}
							/>
						</Rating>
					</label>
				);
			})}<p className="fz16 marl10" style={{lineHeight:'35px'}}>(01)</p>
		</Container>
	);
};

export default Rate;
