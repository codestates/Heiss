# Heiss

![로고](https://user-images.githubusercontent.com/68473415/132611328-7638a5ed-2523-4ce1-a03a-dd7d9919c37c.png)
[Heiss 바로가기](https://heiss.shop/)

## 프로젝트 소개
내가 마음에 드는 케이스를 친구가 사용해서 구매하지 못한 경험이 있으셨나요?
나만의 개성, 특별함이 좋아서 시중에 판매하지 않는다 생각하고 구매했다가 길거리에서 같은 케이스를 보면 기분이 안 좋은적이 있으셨나요?
이쁘고 개성있는 케이스들이 많다고 생각하시나요?

맞습니다..
하지만, 여러분이 생각한 멋진 케이스중에서도 더 개성있는 케이스를 만들 수 있습니다.
반려동물사진, 커플사진, 이모지, 텍스트, 색상부터 도형까지 내 핸드폰 케이스안에서 작은 디자이너가 되어보세요!
하나뿐인 나만의 케이스 하이스에서는 다 가능합니다!

## 주요 기능

- 렌딩페이지  
    ![랜딩 flow](https://user-images.githubusercontent.com/68473415/136419297-3ceb23ba-38f1-49b2-b147-2b96cba12bf9.gif)

- 마이페이지
 
    ![마이페이지](https://user-images.githubusercontent.com/79984511/137337918-c71e2d6a-5619-4469-a656-437556f000ff.gif)

- 케이스 제작  
    ![고양이 전체화면](https://user-images.githubusercontent.com/68473415/136501866-4365d2e1-da80-4aa6-af9f-3128005088ac.gif)
    ![우주인 전체](https://user-images.githubusercontent.com/68473415/136501879-13cceadc-1805-4766-8e46-073df1569a82.gif)

- 케이스 퍼온 후 수정    
    ![케이스 퍼오고수정](https://user-images.githubusercontent.com/79984511/137337623-bf85f945-956d-40e7-b9a1-b44715f0969d.gif)

- 리뷰 전체 
 
    ![리뷰전체](https://user-images.githubusercontent.com/79984511/137338560-30ee5360-522b-4a55-8558-67ff9677866e.gif)

- 리뷰 디테일    
    ![리뷰테ㅣㄹ](https://user-images.githubusercontent.com/79984511/137337563-c212846c-a994-4a23-ad11-513cbec307c1.gif)

- 리뷰 작성
 
    ![리뷰작성](https://user-images.githubusercontent.com/79984511/137337469-2a0c7ae8-64bc-46fc-806e-314c010f590f.gif)       
    
- 리뷰 수정    
    ![리뷰수정](https://user-images.githubusercontent.com/79984511/137337533-61fd0473-1063-43f4-98b8-efe36cab39fc.gif)
    
- 리뷰 삭제
 
    ![리뷰삭제](https://user-images.githubusercontent.com/79984511/137337597-dcf610d6-d600-41bf-95ee-325e7d1eb5ec.gif)

- 주문  
    ![결제](https://user-images.githubusercontent.com/79984511/137336999-b74a630c-bdab-469d-bf89-f276a9a2adc7.gif)
    
- 회원정보수정
 
    ![회원정보수정](https://user-images.githubusercontent.com/79984511/137338909-06ffa854-15fd-464d-9a96-961b34b91d93.gif)

## Deployment Architecture
![](https://user-images.githubusercontent.com/79843401/136426704-a187487c-766a-4073-aaa2-fef5e3be3b05.png)

## DB Schema
![DB Schema](https://cdn.discordapp.com/attachments/884333098534334486/894843541799440435/unknown.png)

## Wire Frame
![Wire Frame](https://user-images.githubusercontent.com/68473415/136408480-2b702eef-15b4-43f6-af0b-a5e987366922.png)

## Server Flow Chart
![Server Flow Chart](https://user-images.githubusercontent.com/68473415/136436576-2b13f32a-1891-498f-b171-277b9cb6046e.jpg)

## Client Flow Chart
![Client Flow Chart](https://cdn.discordapp.com/attachments/884333098534334486/895709678728798268/Heiss_FlowChart_1.jpg)

### Front-end Stack
- HTML
- CSS
- JavaScript
- Styled Component
- React
- Axios
- Redux
- hooks
- Router
- Fabric

### Back-end Stack
- Mysql
- RDS
- Sequelize
- Nodejs
- express
- JWT
- oAuth2.0
- multer

## TEAM 

<details>
<summary>이성훈</summary>
<div markdown="1">       

* position : Front-End
* contribution :
    - 전체적인 디자인 및 애니메이션 구현
    - Fabric으로 메인기능인 케이스 제작 기능 구현
    - theme.js를 통한 CSS 코드 리팩토링
    - 보관함, 장바구니, 주문내역 axios 구현
</div>
</details>

<details>
<summary>장석진</summary>
<div markdown="1">       

* position : Front-End
* contribution 
</div>
</details>

<details>
<summary>방예은</summary>
<div markdown="1">       

* position : Back-End
* contribution : 
    - [Front]
        - 회원기능 (로그인, 회원가입, 회원정보수정, 비밀번호찾기, 회원탈퇴)
        - 리뷰기능구현/모달 반응형 CSS (리뷰작성 및 수정 삭제, 리뷰 좋아요, 케이스 퍼가기)
        - 모달구현 및 CSS (alert, confirm, 보관함, 회원수정, 탈퇴, 비밀번호 찾기 모달)
        - 마이페이지 반응형 CSS
    - [Back]
        - API작성 (리뷰 CRUD, 케이스 CRUD, 장바구니 CRD, 보관함 CRD)
        - 배포 (AWS를 이용한 서버, 클라이언트 배포 자동화)
        - Sequelize / DB구축
</div>
</details>

<details>
<summary>윤성민</summary>
<div markdown="1">   
    
* position : Back-End
* contribution :
    
    -API작성
    
    -이미지 처리
    
    -Paypal 결제
    
    -이메일 인증

</div>
</details>
