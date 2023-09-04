import { useEffect } from "react";
import "../App.css";
import Button from "./Button";
const { Kakao } = window;

export default function KakaoShareButton({ now }) {
	// const url = "https://korea-lottery.netlify.app/";
	const resultUrl = window.location.href;

	useEffect(() => {
		Kakao.cleanup(); // 중독 실행 방지
		Kakao.init("cd8c5869f536ba42f2dceb268a617a1e");
	}, []);

	const shareKakao = () => {
		Kakao.Share.sendDefault({
			objectType: "feed",
			content: {
				title: "복권 번호 추출",
				description: `${now} 로또, 연금복권 번호 받아가세요.`,
				imageUrl:
					"https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg", // url + data.image
				link: {
					mobileWebUrl: resultUrl, // 결과페이지
					webUrl: resultUrl,
				},
			},
			buttons: [
				{
					title: "복권 번호 추출하기",
					link: {
						mobileWebUrl: resultUrl, // 결과페이지
						webUrl: resultUrl,
					},
				},
			],
		});
	};
	return (
		<div class="share-button-container">
			<Button
				text="카톡 공유"
				onClick={() => {
					shareKakao();
				}}
			/>
		</div>
	);
}
