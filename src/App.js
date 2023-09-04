import "./App.css";
import { useState } from "react";
import KakaoShareButton from "./component/KakaoShareButton";

// 버튼 컴포넌트
function Button({ onClick, text }) {
	return <button onClick={onClick}>{text}</button>;
}

function App() {
	const [lottoNumbers, setLottoNumbers] = useState([]);
	const [pensionLottoNumbers, setPensionLottoNumbers] = useState([]);
	const today = new Date();
	const year = today.getFullYear();
	const month = today.getMonth() + 1;
	const date = today.getDate();
	const now = `${year}년 ${month}월 ${date}일`;

	// 랜덤 번호 생성기
	const generateRandomNumber = (max) => {
		return Math.floor(Math.random() * max) + 1;
	};
	const onClickLotto = () => {
		const tempNumbers = [];
		while (tempNumbers.length < 6) {
			// 6개가 채워질 때 까지
			let randomNumber = generateRandomNumber(45); // 45까지 숫자 중에 랜덤 뽑기
			if (tempNumbers.indexOf(randomNumber) === -1) {
				// 아직 배열 중에 없으면 추가
				tempNumbers.push(randomNumber);
			}
		}
		setLottoNumbers(tempNumbers);
	};

	const onClickPensionLotto = () => {
		const tempTotalNumbers = [];
		while (tempTotalNumbers.length < 5) {
			const tempNumbers = [];
			// 5조가 채워질 때 까지
			while (tempNumbers.length < 5) {
				let randomNumber = generateRandomNumber(9); // 9까지 숫자 중에 랜덤 뽑기
				// 연금 복권은 숫자 중복 허용
				tempNumbers.push(randomNumber);
			}
			tempTotalNumbers.push(tempNumbers);
		}
		setPensionLottoNumbers(tempTotalNumbers);
	};

	return (
		<div className="container">
			<div className="lotto">
				<div className="date">{now}</div>
				<h1>🍀 오늘의 행운 번호 🍀</h1>

				<section className="lotto-section">
					<h2>로또 🎉</h2>
					<div className="button-group">
						{!lottoNumbers.length ? (
							<Button onClick={onClickLotto} text="추첨" />
						) : (
							<>
								<Button onClick={onClickLotto} text="재추첨" />
								<a
									href="https://www.dhlottery.co.kr/gameInfo.do?method=buyLotto&wiselog=C_A_1_3"
									target="_black"
								>
									<span>로또 구매 사이트 이동</span>
								</a>
							</>
						)}
					</div>
					<div className="numbers">
						{lottoNumbers.map((number, index) => (
							<div className="eachnum" key={index}>
								{number}
							</div>
						))}
					</div>
				</section>

				<section className="pension-section">
					<h2>연금복권 🎊</h2>
					<div className="button-group">
						{!pensionLottoNumbers.length ? (
							<Button onClick={onClickPensionLotto} text="추첨" />
						) : (
							<>
								<Button onClick={onClickPensionLotto} text="재추첨" />
								<a
									href="https://dhlottery.co.kr/gameInfo.do?method=game720Method"
									target="_black"
								>
									<span>연금복권 구매 사이트 이동</span>
								</a>
							</>
						)}
					</div>
					<div className="pension-numbers">
						{pensionLottoNumbers.map((joNumbers, index) => (
							<div className="pension-group" key={index}>
								<span>
									<h5>{index + 1}조 :</h5>
								</span>
								<span className="numbers">
									{joNumbers.map((number, idx) => (
										<div className="eachnum" key={idx}>
											{number}
										</div>
									))}
								</span>
							</div>
						))}
					</div>
				</section>
				<KakaoShareButton now={now} />
			</div>
		</div>
	);
}

export default App;
