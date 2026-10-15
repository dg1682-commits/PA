/**
 * 콘텐츠 프롬프트 & 대본 저장소 (Prompt Studio)
 * 메인 애플리케이션 스크립트 (리스트 전용, 컴팩트 대시보드, MD 내보내기, 삭제 확인 모달)
 */

(function () {
  'use strict';

  // ==========================================
  // 1. 상수 및 초기 기본 데이터
  // ==========================================
  const STORAGE_KEY_ITEMS = 'prompt_studio_contents_v1';
  const STORAGE_KEY_CONFIG = 'prompt_studio_config_v1';

  const DEFAULT_CONFIG = {
    statuses: ['대기중', '진행중', '완료'],
    channels: ['비츠온TV', '아라쇼', '일신비츠온'],
    formats: ['롱폼', '쇼츠'],
    categories: ['비츠온 콘텐츠', '광고'],
    customColumns: []
  };

  // 사용자가 메모장으로 저장해둔 필수 참고 프롬프트 6종
  const REFERENCE_PROMPTS = [
    {
      id: 'ref-01',
      num: '01',
      title: '01 주제 프롬프트(비츠온TV용)',
      desc: '조명·전기·산업자재·MRO 유튜브 주제 발굴',
      content: `# 비츠온TV 조명·전기·산업자재·공구·MRO 유튜브 주제 발굴 프롬프트

당신은 대중적인 조회수를 만드는 **조명·전기·산업자재·공구·설비·생활공구·MRO 상품 분야의 유튜브 콘텐츠 전문 기획자**입니다.

제가 원하는 콘텐츠는 전기기사, 기술자, 현장 작업자를 위한 전문 강의나 단순한 상품 소개가 아닙니다.

조명이나 공구, 산업자재에 아무 관심이 없는 일반인도 제목과 썸네일을 보는 순간

* “왜 이렇게 생겼지?”
* “이 안에는 뭐가 들어 있을까?”
* “이게 어떻게 작동하는 거지?”
* “이걸 안 쓰면 어떻게 될까?”
* “왜 굳이 이런 구조로 만들었지?”
* “전기가 여기서 어떻게 움직이는 거지?”
* “이 작은 게 어떻게 이런 힘을 내지?”
* “이렇게 써도 괜찮은 걸까?”
* “매일 봤는데 이런 원리였다고?”

라는 궁금증이 즉시 생기는 주제를 찾아야 합니다.

가장 중요한 것은

**‘제품을 홍보할 수 있는가?’가 아니라 ‘답을 확인하지 않고 지나가기 어려운가?’입니다.**

제품은 이야기의 주인공이 아니라 **궁금증을 설명하기 위한 소재**로 활용하세요.

모든 주제는 가능하면

* 3D 모델링
* 제품 분해
* 내부 절개도
* 투명화
* 전류 흐름
* 열의 이동
* 빛의 이동
* 압력 변화
* 회전과 마찰
* 힘의 전달
* 공기와 물의 흐름
* 작동 전후 비교
* 정상 상태와 고장 상태 비교
* 재료의 변형
* 실제 사용 상황

등을 활용하여 시각적으로 강하게 설명할 수 있어야 합니다.

---

# 가장 중요한 주제 방향

## 1. 조명 속에 숨겨진 원리
우리가 매일 사용하는 조명이 실제로 어떻게 빛을 만들고 제어하는지 찾아보세요.
단순 제품 소개가 아니라 **빛·전기·열이 내부에서 어떻게 움직이는가**에 집중하세요.
예시 방향:
* LED 전구는 왜 만져보면 뜨거울까?
* LED는 뜨거워지면 왜 수명이 짧아질까?
* LED 전구 안에는 대체 뭐가 들어 있을까?
* LED는 어떻게 전기를 빛으로 바꿀까?
* 전구는 왜 점점 사라지고 LED로 바뀌었을까?
* LED 전구 아래쪽에 금속 방열판이 필요한 이유
* 같은 밝기인데 LED가 전기를 훨씬 적게 쓰는 이유
* LED가 갑자기 깜빡이기 시작하는 이유
* 조명을 끄고도 희미하게 빛나는 이유
* 같은 LED인데 어떤 제품은 유독 빨리 고장 나는 이유

---

## 2. 전기제품 속에 숨겨진 구조
콘센트, 멀티탭, 스위치, 차단기, 플러그, 전선 등 너무 익숙해서 오히려 원리를 생각하지 않는 물건을 적극적으로 찾으세요.
예시 방향:
* 콘센트 구멍 안에는 대체 뭐가 있을까?
* 멀티탭 하나에 너무 많은 제품을 꽂으면 왜 위험할까?
* 차단기는 어떻게 위험한 전류를 순식간에 끊을까?
* 누전차단기는 사람이 감전되기 전에 어떻게 알아챌까?
* 전선은 왜 굵기가 모두 다를까?
* 전선이 뜨거워지는 진짜 이유
* 전선 안에는 왜 여러 가닥의 구리가 들어갈까?
* 플러그의 금속 핀은 왜 모양과 굵기가 다를까?
* 스위치는 어떻게 전기를 끊었다 연결할까?
* 접지선은 평소 아무 일도 하지 않는데 왜 필요할까?

---

## 3. 공구의 의외의 작동 원리
드릴, 그라인더, 절단기, 임팩트, 렌치, 톱, 망치 등 익숙한 공구 속에 숨어 있는 힘과 운동의 원리를 찾으세요.
예시 방향:
* 임팩트 드라이버는 작은데 어떻게 그렇게 강한 힘을 낼까?
* 전동드릴과 임팩트 드라이버는 내부가 어떻게 다를까?
* 드릴날은 왜 나선형으로 생겼을까?
* 콘크리트 드릴은 어떻게 돌을 뚫을까?
* 그라인더 날은 왜 그렇게 빠르게 회전할까?
* 절단석은 얇은데 어떻게 철을 자를까?
* 렌치는 왜 손잡이가 길수록 쉽게 돌아갈까?
* 니퍼는 작은 힘으로 어떻게 전선을 자를까?
* 톱날의 이빨은 왜 한쪽 방향으로만 되어 있지 않을까?
* 망치는 왜 손잡이 끝을 잡을수록 강해질까?

---

## 4. 산업자재의 숨겨진 역할
케이블타이, 앙카, 볼트, 너트, 실리콘, 테이프, 호스, 베어링, 패킹 등 작고 평범하지만 실제 현장에서는 중요한 자재를 다루세요.
단, 단순 사용법이 아니라 **“왜 이런 구조인가?”**를 질문하세요.
예시 방향:
* 케이블타이는 왜 한번 조이면 다시 풀리지 않을까?
* 앙카볼트는 콘크리트 안에서 어떻게 버틸까?
* 나사는 왜 돌리면 앞으로 이동할까?
* 볼트는 진동을 받으면 왜 저절로 풀릴까?
* 와셔 하나가 볼트 밑에 들어가는 이유
* 베어링은 어떻게 마찰을 줄일까?
* 실리콘은 어떻게 틈을 막으면서도 움직임을 버틸까?
* 테프론 테이프는 왜 배관에 감으면 물이 새지 않을까?
* 고무 패킹 하나가 엄청난 압력을 막는 방법
* 케이블타이 머리 안에는 어떤 구조가 숨어 있을까?

---

## 5. 배관·설비·유체의 원리
물, 공기, 압력, 배수 등이 이동하는 과정에서 일반인의 직관과 다른 현상을 찾으세요.
예시 방향:
* 수도꼭지를 잠그면 흐르던 물은 어디에서 멈출까?
* 배관은 왜 직선으로만 연결하지 않을까?
* 배수구에서 냄새가 올라오지 않는 이유
* 변기에는 왜 항상 물이 조금 남아 있을까?
* 수도관을 갑자기 잠그면 왜 ‘쿵’ 소리가 날까?
* 높은 건물 꼭대기까지 물은 어떻게 올라갈까?
* 배관에 공기가 차면 왜 문제가 생길까?
* 호스가 꺾이면 물이 갑자기 약해지는 이유
* 작은 밸브 하나가 어떻게 높은 수압을 막을까?
* 겨울에 수도관이 얼면 왜 터질까?

---

## 6. 안전장치가 작동하는 순간
평소에는 보이지 않지만 사고 순간 사람이나 설비를 보호하는 장치를 적극적으로 찾으세요.
예시 방향:
* 누전차단기는 감전을 어떻게 감지할까?
* 퓨즈는 왜 일부러 먼저 끊어지게 만들까?
* 멀티탭에는 왜 과부하 차단 기능이 필요할까?
* 아크 차단기는 불꽃을 어떻게 알아챌까?
* 접지가 없으면 실제로 어떤 일이 벌어질까?
* 전선 피복이 벗겨지면 왜 위험할까?
* 전기제품 내부에는 왜 여러 개의 보호장치가 들어갈까?
* 과열방지장치는 온도가 높아진 것을 어떻게 알까?
* 산업용 안전장갑은 어떻게 손을 보호할까?
* 안전모는 얇아 보이는데 충격을 어떻게 줄일까?

---

## 7. 예상과 실제가 다른 원리
일반인의 직관과 실제 전기·기계·공학 원리가 다른 주제를 우선하세요.
* 볼트는 무조건 세게 조이면 좋은 걸까?
* 전선을 굵게 만들수록 무조건 좋은 걸까?
* LED는 전기를 적게 쓰는데 왜 열이 날까?
* 조명을 껐는데도 전기가 남아 있을 수 있을까?
* 멀티탭 정격이 높으면 아무거나 꽂아도 될까?

---

# 최종 TOP 10 선정 기준
1. 제목만 읽어도 답이 궁금한가?
2. 조명·공구·산업자재에 관심 없는 사람도 즉시 이해하는가?
3. 썸네일 한 장으로 궁금증을 표현할 수 있는가?
4. “왜?”, “어떻게?”, “안에는 뭐가 있지?”가 강하게 발생하는가?
5. 위험·비밀·반전·의외성 중 하나가 존재하는가?
6. 3D 단면·절개·투명화·작동 과정으로 볼거리가 충분한가?
7. 전기·열·빛·압력·회전·마찰·힘의 이동 중 하나를 시각화할 수 있는가?
8. 이미 유튜브에서 지나치게 흔하게 소비된 질문은 아닌가?
9. 영상 1~3분 동안 과정과 반전을 만들 수 있는가?
10. 비츠온TV에서 취급하는 상품군과 자연스럽게 연결할 수 있는가?`
    },
    {
      id: 'ref-02',
      num: '02',
      title: '02 대본 프롬프트(비츠온TV용)',
      desc: '2~3분 완성형 유튜브 내레이션 대본 작성',
      content: `# 비츠온TV 조명·전기·산업자재·공구·MRO 유튜브 대본 작성 프롬프트

당신은 대중적인 조회수를 만드는 **조명·전기·산업자재·공구·설비·생활공학·MRO 상품 분야의 유튜브 전문 대본 작가**입니다.

아래에 제공하는 **[주제]**를 이용하여 조명이나 전기, 공구, 산업자재에 전혀 관심이 없는 일반인도 끝까지 볼 수 있는 **2~3분 분량의 유튜브 대본**을 작성하세요.

이 영상의 목적은 전문지식을 많이 전달하거나 특정 제품을 홍보하는 것이 아닙니다.

시청자가 처음에는
“이게 어떻게 작동하는 거지?”
“안에는 대체 뭐가 들어 있지?”
“왜 굳이 이렇게 만들었지?”
라는 질문 때문에 영상을 클릭하고,

영상을 보는 동안 계속해서
“그런데 그건 어떻게 하지?”
“그럼 이건 위험하지 않나?”
“왜 이런 현상이 생기지?”
“그래서 어떻게 해결하지?”
라는 다음 질문이 생기게 만들어야 합니다.

가장 중요한 것은 시청자가 영상을 본 뒤
**“이 제품의 특징을 알았다”**보다
**“평소 쓰던 물건이 이런 원리로 작동하고 있었구나”**
라고 느끼게 만드는 것입니다.

---

# 1. 가장 중요한 대본 원칙
다음 구조를 기본으로 사용합니다:
눈앞의 익숙한 제품 제시
→ 이상한 현상 발견
→ 핵심 질문
→ 문제의 크기 또는 현상 체감
→ 일반인이 떠올릴 첫 번째 설명
→ 그런데 그 설명만으로 해결되지 않는 문제
→ 실제 내부 구조 공개
→ 전기·빛·열·힘·압력·회전 등의 이동
→ 작동 과정에서 생기는 새로운 문제
→ 그것을 해결하는 부품 또는 구조
→ 처음 질문에 대한 명확한 정답

단, 이 구조를 소제목처럼 노출하지 말고 자연스러운 하나의 내레이션으로 이어가세요.

---

# 2. 인트로 작성법
첫 문장은 화면에서 바로 보여줄 수 있는 **제품이나 현상**으로 시작하세요.
예:
“여기 평범한 LED 전구가 있습니다.”
“여기 우리가 매일 사용하는 멀티탭이 있습니다.”
“여기 작은 임팩트 드라이버가 하나 있습니다.”

역사적 배경, 제품 정의, 전문용어, 브랜드, 모델명부터 시작하지 마세요.
첫 2~4문장 안에 반드시 평범하게 보이던 물건에서 **이상한 점 하나**를 발견해야 합니다.
그리고 영상 전체를 끌고 갈 **단 하나의 가장 강한 핵심 질문**을 던지세요.

---

# 3. 대본에서 절대 하지 말 것
* “안녕하세요 여러분”으로 시작하지 마세요.
* “오늘 알아볼 것은”으로 시작하지 마세요.
* 제목을 그대로 읽고 시작하지 마세요.
* 제품명과 스펙 나열로 시작하지 마세요.
* 전문용어 정의부터 시작하지 마세요.
* 결론을 초반에 바로 공개하지 마세요.
* 쇼핑호스트처럼 제품 장점을 나열하지 마세요.
* 한 문단에서 숫자를 여러 개 연속으로 나열하지 마세요.
* 장면으로 보여줄 수 없는 추상적인 설명을 길게 하지 마세요.
* “정말 놀랍죠?”, “신기하지 않나요?” 같은 의미 없는 리액션을 반복하지 마세요.

---

# 4. 결론 작성 규칙
영상 마지막에는 처음 던진 핵심 질문에 대해 **한 문장으로 명확하게 답할 수 있어야 합니다.**

좋은 결론 예:
“결국 임팩트 드라이버의 힘은 단순히 모터를 세게 돌려서 나오는 게 아닙니다. 내부 해머가 순간적인 충격을 반복하면서 큰 회전력을 만들어내는 겁니다.”
“결국 LED가 전기를 적게 쓴다고 해서 열이 없는 건 아닙니다. LED 칩에서 발생한 열을 얼마나 잘 밖으로 빼내느냐가 안정적인 작동에 중요한 겁니다.”

---

# 최종 출력 방식
출력할 때는 분석, 구성 설명, 소제목, 장면 번호, 출처 목록 등을 출력하지 마세요.
실제로 녹음할 수 있는 **완성된 내레이션 대본만 출력하세요.**
첫 문장부터 바로 본편을 시작하세요.

---

# 주제
[누전차단기는 새어나간 전기를 어떻게 알아챌까?]`
    },
    {
      id: 'ref-03',
      num: '03',
      title: '03 첫번째 프롬프트',
      desc: '대본 분석 및 3~4초 장면 분할 3D 키프레임 생성',
      content: `대본 길이는 ?초고 대본은 그대로 유지하세요
위 대본을 분석하여 영상의 흐름에 맞게 장면을 적절한 개수로 나누고, 각 장면마다 이미지 생성용 프롬프트를 작성해주세요.


각 장면은 3~4초정도로 구성되고 절대로 5초를 넘어가서는 안됩니다.


각 이미지는 공학 원리, 과학 원리, 구조, 작동 방식, 역사적 사실, 일상 지식 등을 시각적으로 이해하기 쉽게 설명하는 **고품질 3D 인포그래픽 영상의 키프레임**처럼 보여야 합니다.


각 장면의 이미지에는 설명용 텍스트, 자막, 화살표, 수치, 라벨, 아이콘 등의 인포그래픽 요소를 아직 넣지 마세요.
오직 배경, 사물, 구조물, 인물, 기계, 자연현상 등 **장면 자체만 생성**하도록 작성해주세요.


모든 장면은 다음 기준을 공통으로 유지해주세요.


* 16:9 가로형 영상
* 고품질 3D 렌더링
* 선명하고 직관적인 구조
* 실제 구조와 원리를 이해하기 쉬운 시각화
* 입체감과 깊이감이 확실한 구성
* 영화처럼 역동적인 카메라 구도
* 장면마다 핵심 대상이 명확하게 보이도록 구성
* 과도하게 복잡한 배경은 피하고 설명 대상에 시선이 집중되도록 구성
* 동일한 대상이 여러 장면에 등장할 경우 디자인, 색상, 형태, 재질을 일관되게 유지
* 장면이 바뀌더라도 전체 영상의 3D 그래픽 스타일과 조명 품질을 통일
* 필요할 경우 단면도, 절개 구조, 분해된 구조, 확대 구조, 투시 구조 등을 활용
* 실제 사진처럼 평범하게 만들기보다 교육용 3D 다큐멘터리·공학 시각화 영상처럼 명확하고 인상적으로 표현`
    },
    {
      id: 'ref-04',
      num: '04',
      title: '04 두번째 Flow 프롬프트',
      desc: '개별 원본 이미지 인포그래픽 강화 편집 프롬프트',
      content: `현재 선택되었거나 제공된 모든 원본 이미지를 각각 개별적으로 편집하라.
각 원본 이미지를 서로 독립된 이미지 편집 작업으로 취급하고, 원본 이미지 한 장마다 정확히 한 장의 인포그래픽 강화 이미지를 생성하라.
원본 이미지가 15장이면 결과 이미지도 정확히 15장이어야 하며, 원본 순서와 결과 순서의 일대일 대응을 반드시 유지하라.
첫 번째 이미지나 가장 최근 이미지 한 장만 편집하지 말라. 여러 원본 이미지를 한 장으로 합치거나, 콜라주, 격자 배열, 다중 화면, 분할 화면 또는 합성 이미지로 만들지 말라. 원본을 건너뛰거나 합치거나 순서를 바꾸거나 교체하거나 중복해서 사용하지 말라.
각 결과는 반드시 해당 원본 이미지 한 장만을 기반으로 생성해야 하며, 다른 원본 이미지의 인물, 사물, 건축물, 배경 또는 그래픽 구성을 가져와 섞지 말라.

작업 목적:
이번 작업의 목적은 원본 장면을 새롭게 재설계하거나 다른 장면으로 다시 생성하는 것이 아니다.
각 원본 이미지의 장면, 핵심 대상, 구도, 카메라 각도, 원근감, 화면 배치, 건축물, 구조물, 기계, 차량, 지형, 자연환경, 조명, 색감과 시각적 정체성을 최대한 그대로 유지하면서, 그 위에 주제를 더 빠르고 직관적으로 이해할 수 있는 인포그래픽 요소만 추가하라.

핵심 시각 규칙:
인포그래픽 효과는 절대로 작거나 은은하게 표현하지 말라. 모든 핵심 그래픽 요소는 화면에서 즉시 눈에 들어올 정도로 크고 선명하고 화려하게 표현하라.
화살표, 링, 경계선, 강조 영역, 경로선, 호출선, 측정선, 데이터 표시와 기타 핵심 인포그래픽 요소는 충분히 굵고 크게 만들고, 필요하면 화면의 상당한 영역을 차지할 정도로 적극적으로 확대하라.
밝은 빨강, 전기 파랑, 시안, 노랑, 주황, 초록, 보라, 마젠타 등 다양한 고채도 색상을 적극적으로 조합하라. 한 이미지 안에서도 서로 다른 정보는 서로 다른 색상으로 명확히 구분하라. 배경과 비슷한 색은 피하고 항상 강한 대비를 만들어라.

한국어 표기 절대 규칙:
이미지 안에 나타나는 모든 제목, 라벨, 설명, 주석, 캡션, 수치 설명, 단위와 기타 읽을 수 있는 정보는 반드시 자연스럽고 정확한 한국어로 작성하라.
이미지 안에 영어를 절대로 사용하지 말라. 영어 단어, 영어 약자, 로마자, 의미 없는 유사 영어, 한글과 영어가 혼합된 문장을 생성하지 말라.
숫자는 필요할 때 사용할 수 있지만, 숫자에 붙는 단위와 설명은 반드시 한국어로 작성하라. 영문 단위 대신 ‘미터’, ‘제곱미터’, ‘킬로그램’, ‘초’, ‘도’처럼 읽기 쉬운 한국어 표기를 사용하라.

1) 인포그래픽이 크게 차지하게 하는 문장:
인포그래픽 요소는 화면에서 매우 잘 보여야 하며, 단순 보조 장식처럼 작게 배치하지 말고 화면의 상당한 영역을 차지할 정도로 크고 분명하게 표현하라.

2) 다채로운 색상 강조 문장:
각 장면의 인포그래픽은 단조로운 한두 가지 색만 사용하지 말고, 빨강, 전기 파랑, 시안, 노랑, 주황, 초록, 보라, 마젠타 등 다양한 고채도 강조색을 적극적으로 조합하여 다채롭고 시각적으로 풍부하게 표현하라.

3) 빠른 줌인/줌아웃을 더 강하게 하는 문장:
빠른 줌 연출이 포함되는 장면에서는 시청자가 즉시 체감할 수 있을 정도로 짧고 강한 속도감의 줌인 또는 줌아웃을 사용하라.

4) 인포그래픽과 줌이 같이 터지게 하는 문장:
빠른 줌 연출이 들어가는 장면에서는 카메라 움직임과 동시에 인포그래픽도 더 강하게 활성화되도록 하라.`
    },
    {
      id: 'ref-05',
      num: '05',
      title: '05 세번째 프롬프트(비츠온TV용)',
      desc: 'Google Flow 8초 영상 생성 프롬프트 마스터',
      content: `[비츠온TV FLOW 영상 프롬프트 생성 마스터]

당신은 비츠온TV의 공학·과학·전기·조명·건축·산업·생활원리 콘텐츠를
고품질 3D 엔지니어링 다큐멘터리 영상으로 설계하는 영상 연출가입니다.

제공된 대본과 각 장면의 두 이미지를 분석하여,
Google Flow에서 실제 영상 생성에 그대로 사용할 수 있는
장면별 8초 영상 생성 프롬프트를 작성해주세요.

==================================================
1. 입력 이미지의 역할
==================================================
START IMAGE: 인포그래픽이 없는 원본 CLEAN 3D 장면
END IMAGE: 동일한 장면에 설명용 인포그래픽이 추가된 INFO 장면

두 이미지는 반드시 같은 장면의 시작과 종료 상태로 취급해주세요.
영상은 START IMAGE의 핵심 피사체를 최대한 유지하면서 시작하고,
시간이 흐르면서 실제 3D 장면의 움직임, 실제 3D 공간을 이동하는 카메라,
그리고 실제 현상을 설명하는 인포그래픽 모션이 결합되어
마지막 프레임에서는 END IMAGE의 구조와 인포그래픽 상태에 자연스럽게 도달해야 합니다.

==================================================
2. 비츠온TV 영상의 핵심 연출 원칙
==================================================
모든 장면은 다음 세 가지 요소를 반드시 결합해주세요:
MOVING 3D SCENE + TRUE 3D CAMERA TRAVEL + PROGRESSIVE INFOGRAPHIC MOTION

==================================================
3. 기본 영상 스타일
==================================================
* 16:9 horizontal landscape
* 약 8초 길이
* premium cinematic 3D engineering documentary
* high-end realistic 3D rendering
* physically plausible materials and structures
* realistic global illumination and reflections
* strong three-dimensional depth

==================================================
4. 오디오 규칙 — 매우 중요
==================================================
영상에는 장면의 실제 움직임을 보조하는 짧고 심플한 효과음(SFX)만 선택적으로 사용할 수 있습니다.
다음은 모든 장면에서 절대 금지합니다:
* BGM / background music / soundtrack / cinematic score / music
* narration / voice-over / dialogue / speech / human voice

SIMPLE SYNCHRONIZED SOUND EFFECTS ONLY.
ABSOLUTELY NO BGM OR MUSIC.
ABSOLUTELY NO NARRATION OR HUMAN VOICE.

==================================================
5. 장면별 분석 및 출력 형식
==================================================
장면 번호:
대본 구간:
장면의 핵심 설명 목적:
앞뒤 장면 연결:
카메라 움직임:
3D 공간 카메라 동선:
단면/내부 진입 여부:
빠른 줌 사용 여부:
장면 자체 움직임:
인포그래픽 등장 순서:
효과음:
Flow 동영상 생성 프롬프트:`
    },
    {
      id: 'ref-06',
      num: '06',
      title: '06 파일 이름 정렬 프롬프트',
      desc: '스크립트 순서 기반 01, 02 순차 번호 파일명 정렬',
      content: `Rename the files by adding sequential numbers such as 01, 02, 03, and so on at the beginning of each filename, following the exact order of the script you have worked on so far. Keep the file order consistent with the script sequence.`
    }
  ];

  // ==========================================
  // Firebase Firestore 설정 및 인스턴스
  // ==========================================
  const FIREBASE_CONFIG = {
    apiKey: "AIzaSyCkxUSTtpibxqMt5Lk6-ul8OpYlgJuynlU",
    authDomain: "promptsave-10211.firebaseapp.com",
    projectId: "promptsave-10211",
    storageBucket: "promptsave-10211.firebasestorage.app",
    messagingSenderId: "637912636337",
    appId: "1:637912636337:web:9c293f54200ba665937b90"
  };

  let db = null;
  let isFirestoreConnected = false;
  let unsubscribeContents = null;
  let unsubscribeConfig = null;
  let isInitialFirestoreSyncDone = false;

  // ==========================================
  // 2. 상태 관리 (State)
  // ==========================================
  let appState = {
    contents: [],
    config: { ...DEFAULT_CONFIG },
    currentTab: 'tab-list',
    searchQuery: '',
    filterStatus: '',
    filterChannel: '',
    filterFormat: '',
    filterCategory: '',
    filterCustom: {}, // { col_id: 'val' }
    sortBy: 'created-desc',
    activeModalId: null,
    deleteTargetId: null, // 삭제 대기 중인 콘텐츠 ID
    activeRefId: 'ref-01',
    firebaseStatus: 'connecting', // 'connecting' | 'connected' | 'error'
    firebaseMessage: 'Firebase 연결 확인 중...',
    charts: {
      channel: null,
      format: null,
      category: null,
      trend: null
    }
  };

  // ==========================================
  // 3. Firebase 및 로컬 스토리지 데이터 관리
  // ==========================================
  function loadFromStorage() {
    try {
      const savedConfig = localStorage.getItem(STORAGE_KEY_CONFIG);
      if (savedConfig) {
        const parsed = JSON.parse(savedConfig);
        appState.config = {
          statuses: parsed.statuses && parsed.statuses.length ? parsed.statuses : [...DEFAULT_CONFIG.statuses],
          channels: parsed.channels && parsed.channels.length ? parsed.channels : [...DEFAULT_CONFIG.channels],
          formats: parsed.formats && parsed.formats.length ? parsed.formats : [...DEFAULT_CONFIG.formats],
          categories: parsed.categories && parsed.categories.length ? parsed.categories : [...DEFAULT_CONFIG.categories],
          customColumns: Array.isArray(parsed.customColumns) ? parsed.customColumns : []
        };
      } else {
        appState.config = JSON.parse(JSON.stringify(DEFAULT_CONFIG));
      }

      const savedItems = localStorage.getItem(STORAGE_KEY_ITEMS);
      if (savedItems) {
        appState.contents = JSON.parse(savedItems)
          .filter(item => item && !String(item.id || '').startsWith('sample-'))
          .map(item => ({
            ...item,
            status: item.status || '대기중',
            customFields: item.customFields || {},
            comments: Array.isArray(item.comments) ? item.comments : []
          }));
        localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(appState.contents));
      } else {
        appState.contents = [];
      }
    } catch (e) {
      console.error('로컬스토리지 로딩 에러:', e);
      appState.config = JSON.parse(JSON.stringify(DEFAULT_CONFIG));
      appState.contents = [];
    }
  }

  function saveContentsToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(appState.contents));
      updateStorageInfo();
    } catch (e) {
      console.error('콘텐츠 로컬 캐시 저장 실패:', e);
    }
  }

  async function saveConfigToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(appState.config));
    } catch (e) {
      console.error('설정 로컬 저장 실패:', e);
    }

    if (db && isFirestoreConnected) {
      try {
        await db.collection('settings').doc('config').set({
          statuses: appState.config.statuses,
          channels: appState.config.channels,
          formats: appState.config.formats,
          categories: appState.config.categories,
          customColumns: appState.config.customColumns,
          updatedAt: new Date().toISOString()
        });
      } catch (err) {
        console.warn('Firestore 설정 동기화 실패:', err);
      }
    }
  }

  function updateStorageInfo() {
    const countEl = document.getElementById('storage-count');
    const totalCount = appState.contents ? appState.contents.length : 0;
    if (countEl) countEl.textContent = `${totalCount}건`;
  }

  function updateSyncStatus(status, message) {
    appState.firebaseStatus = status;
    appState.firebaseMessage = message;

    const dot = document.getElementById('sync-dot');
    const textEl = document.getElementById('sync-status-text');
    const badgeEl = document.getElementById('firebase-badge-status');
    const settingsStatusEl = document.getElementById('settings-sync-status');

    if (dot) {
      dot.className = `sync-indicator-dot ${status}`;
    }

    if (textEl) {
      textEl.textContent = message;
    }

    if (badgeEl) {
      badgeEl.className = `badge badge-firebase ${status}`;
      if (status === 'connected') {
        badgeEl.innerHTML = '<i class="fa-solid fa-circle-check"></i> 클라우드 실시간 연동 완료';
      } else if (status === 'connecting') {
        badgeEl.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> 연결 확인 중...';
      } else {
        badgeEl.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> 규칙/연결 확인 필요';
      }
    }

    if (settingsStatusEl) {
      settingsStatusEl.textContent = message;
    }
  }

  function initFirebase() {
    if (typeof firebase === 'undefined') {
      console.warn('Firebase SDK가 로드되지 않았습니다 (로컬 모드로 작동).');
      updateSyncStatus('error', 'SDK 미로드 (로컬 모드)');
      return;
    }

    try {
      if (!firebase.apps.length) {
        firebase.initializeApp(FIREBASE_CONFIG);
      }
      db = firebase.firestore();

      try {
        db.enablePersistence({ synchronizeTabs: true }).catch((err) => {
          if (err.code === 'failed-precondition') {
            console.warn('IndexedDB 지속성: 여러 탭이 열려 있어 활성 탭에서만 캐시됩니다.');
          } else if (err.code === 'unimplemented') {
            console.warn('현재 브라우저는 오프라인 지속성을 지원하지 않습니다.');
          }
        });
      } catch (e) {}

      updateSyncStatus('connecting', 'Firebase 연결 중...');
      setupFirestoreListeners();
    } catch (err) {
      console.error('Firebase 초기화 실패:', err);
      updateSyncStatus('error', '초기화 실패 (로컬 모드)');
    }
  }

  function setupFirestoreListeners() {
    if (!db) return;

    // 1. contents 컬렉션 실시간 감시 (onSnapshot)
    try {
      if (unsubscribeContents) unsubscribeContents();

      unsubscribeContents = db.collection('contents').onSnapshot((snapshot) => {
        isFirestoreConnected = true;
        updateSyncStatus('connected', 'Firebase 클라우드 연동됨');
        isInitialFirestoreSyncDone = true;

        if (snapshot.empty) {
          appState.contents = [];
          saveContentsToStorage();

          if (appState.currentTab === 'tab-list') {
            renderContentList();
          } else if (appState.currentTab === 'tab-dashboard') {
            renderDashboard();
          }
        } else {
          const cloudContents = [];
          snapshot.forEach(doc => {
            // Firestore에 남아있을 수 있는 샘플 데이터(sample-*) 자동 영구 삭제
            if (String(doc.id).startsWith('sample-')) {
              doc.ref.delete().catch(() => {});
              return;
            }
            const data = doc.data();
            cloudContents.push({
              id: doc.id,
              title: data.title || '',
              status: data.status || '대기중',
              channel: data.channel || '',
              format: data.format || '',
              category: data.category || '',
              customFields: data.customFields || {},
              script: data.script || '',
              imagePrompt: data.imagePrompt || '',
              videoPrompt: data.videoPrompt || '',
              notes: data.notes || '',
              comments: Array.isArray(data.comments) ? data.comments : [],
              createdAt: data.createdAt || new Date().toISOString(),
              updatedAt: data.updatedAt || data.createdAt || new Date().toISOString()
            });
          });

          appState.contents = cloudContents;
          saveContentsToStorage();

          if (appState.currentTab === 'tab-list') {
            renderContentList();
          } else if (appState.currentTab === 'tab-dashboard') {
            renderDashboard();
          }
        }
      }, (error) => {
        console.error('Firestore contents 동기화 오류:', error);
        isFirestoreConnected = false;
        if (error.code === 'permission-denied') {
          updateSyncStatus('error', '보안 규칙 거부 (Rules 설정 필요)');
          showToast('Firestore 권한 오류: 보안 규칙에서 allow read, write를 설정해주세요.');
        } else {
          updateSyncStatus('error', '클라우드 연결 끊김 (로컬 캐시 사용 중)');
        }
      });
    } catch (e) {
      console.error('Firestore contents 리스너 등록 실패:', e);
    }

    // 2. settings/config 문서 실시간 감시
    try {
      if (unsubscribeConfig) unsubscribeConfig();

      unsubscribeConfig = db.collection('settings').doc('config').onSnapshot((doc) => {
        if (doc.exists) {
          const cloudConfig = doc.data();
          if (cloudConfig.channels && cloudConfig.formats && cloudConfig.categories) {
            appState.config = {
              statuses: cloudConfig.statuses && cloudConfig.statuses.length ? cloudConfig.statuses : [...DEFAULT_CONFIG.statuses],
              channels: cloudConfig.channels,
              formats: cloudConfig.formats,
              categories: cloudConfig.categories,
              customColumns: Array.isArray(cloudConfig.customColumns) ? cloudConfig.customColumns : []
            };
            try {
              localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(appState.config));
            } catch (e) {}
            populateSelectOptions();
            renderTableHeader();
            renderFormCustomColumns();
            if (appState.currentTab === 'tab-settings') {
              renderSettings();
            } else if (appState.currentTab === 'tab-list') {
              renderContentList();
            }
          }
        } else {
          saveConfigToStorage();
        }
      }, (err) => {
        console.warn('Firestore config 감시 에러:', err);
      });
    } catch (e) {
      console.error('Firestore config 리스너 등록 실패:', e);
    }
  }

  async function uploadAllLocalToFirestore(isSilent = false) {
    if (!db) {
      showToast('Firebase가 초기화되지 않았습니다.');
      return;
    }

    try {
      if (!isSilent) showToast('클라우드로 데이터 업로드 중...');
      const batch = db.batch();

      appState.contents.forEach(item => {
        const docRef = db.collection('contents').doc(item.id);
        batch.set(docRef, item);
      });

      const configRef = db.collection('settings').doc('config');
      batch.set(configRef, {
        statuses: appState.config.statuses,
        channels: appState.config.channels,
        formats: appState.config.formats,
        categories: appState.config.categories,
        customColumns: appState.config.customColumns,
        updatedAt: new Date().toISOString()
      });

      await batch.commit();
      isFirestoreConnected = true;
      updateSyncStatus('connected', 'Firebase 클라우드 연동됨');

      if (!isSilent) {
        showToast(`로컬 데이터 ${appState.contents.length}건이 클라우드에 성공적으로 동기화되었습니다!`);
      }
    } catch (err) {
      console.error('클라우드 일괄 동기화 실패:', err);
      if (!isSilent) {
        if (err.code === 'permission-denied') {
          showToast('동기화 실패: Firebase 보안 규칙을 확인하세요.');
          openRulesModal();
        } else {
          showToast('클라우드 동기화 실패: ' + err.message);
        }
      }
    }
  }

  async function reloadFromFirestore() {
    if (!db) {
      showToast('Firebase가 연결되지 않았습니다.');
      return;
    }

    try {
      showToast('클라우드 최신 데이터 불러오는 중...');
      const snapshot = await db.collection('contents').get();
      if (!snapshot.empty) {
        const cloudContents = [];
        snapshot.forEach(doc => {
          if (String(doc.id).startsWith('sample-')) {
            doc.ref.delete().catch(() => {});
            return;
          }
          cloudContents.push({ id: doc.id, ...doc.data() });
        });
        appState.contents = cloudContents;
        saveContentsToStorage();
        renderContentList();
        renderDashboard();
        updateStorageInfo();
        showToast(`클라우드에서 ${cloudContents.length}건을 성공적으로 불러왔습니다.`);
      } else {
        appState.contents = [];
        saveContentsToStorage();
        renderContentList();
        renderDashboard();
        updateStorageInfo();
        showToast('클라우드에 저장된 콘텐츠가 없습니다.');
      }
    } catch (err) {
      console.error('클라우드 불러오기 실패:', err);
      showToast('불러오기 실패: ' + err.message);
    }
  }

  function openRulesModal() {
    const modal = document.getElementById('firebase-rules-modal');
    if (modal) modal.classList.remove('hidden');
  }

  function closeRulesModal() {
    const modal = document.getElementById('firebase-rules-modal');
    if (modal) modal.classList.add('hidden');
  }

  // ==========================================
  // 4. UI 네비게이션 및 탭 전환
  // ==========================================
  function switchTab(tabId) {
    appState.currentTab = tabId;

    document.querySelectorAll('.sidebar-menu .menu-item').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabId);
    });

    document.querySelectorAll('.tab-pane').forEach(pane => {
      pane.classList.toggle('active', pane.id === tabId);
    });

    const titleEl = document.getElementById('current-page-title');
    const descEl = document.getElementById('current-page-desc');

    if (tabId === 'tab-list') {
      titleEl.textContent = '콘텐츠 목록';
      descEl.textContent = '저장된 대본과 프롬프트를 테이블 리스트로 조회하고 관리합니다.';
      renderContentList();
    } else if (tabId === 'tab-editor') {
      const editId = document.getElementById('edit-id').value;
      titleEl.textContent = editId ? '콘텐츠 수정하기' : '새 콘텐츠 작성';
      descEl.textContent = '대본, 프롬프트, 비고 및 분류 정보를 입력하고 저장합니다.';
    } else if (tabId === 'tab-dashboard') {
      titleEl.textContent = '데이터 대시보드';
      descEl.textContent = '채널별, 영상 형식별, 콘텐츠 유형별 통계를 한눈에 확인합니다.';
      renderDashboard();
    } else if (tabId === 'tab-settings') {
      titleEl.textContent = '분류 & 항목 설정';
      descEl.textContent = '채널명, 영상 형식, 콘텐츠 유형을 관리하고 데이터를 백업합니다.';
      renderSettings();
    }
  }

  // ==========================================
  // 5. 진행상태 배지 헬퍼 & 테이블 헤더 & 옵션 동적 갱신
  // ==========================================
  function getStatusBadgeHtml(status) {
    const s = status || '대기중';
    let badgeClass = 'tag-status-custom';
    let iconHtml = '<span class="status-pulse-dot"></span>';

    if (s === '진행중') {
      badgeClass = 'tag-status-progress';
    } else if (s === '완료') {
      badgeClass = 'tag-status-done';
      iconHtml = '<i class="fa-solid fa-check" style="font-size:10px;margin-right:4px;"></i>';
    } else if (s === '대기중') {
      badgeClass = 'tag-status-wait';
      iconHtml = '<i class="fa-regular fa-clock" style="font-size:10px;margin-right:4px;"></i>';
    }

    return `<span class="tag-badge ${badgeClass}">${iconHtml}${escapeHtml(s)}</span>`;
  }

  function renderTableHeader() {
    const headRow = document.getElementById('table-head-row');
    if (!headRow) return;

    const customCols = appState.config.customColumns || [];
    const customColsHtml = customCols.map(col => `
      <th style="width: 105px;" title="${escapeHtml(col.name)}">${escapeHtml(col.name)}</th>
    `).join('');

    headRow.innerHTML = `
      <th style="min-width: 220px;">콘텐츠 제목</th>
      <th style="width: 105px;">진행상태</th>
      <th style="width: 100px;">채널명</th>
      <th style="width: 85px;">영상 형식</th>
      <th style="width: 105px;">콘텐츠 유형</th>
      ${customColsHtml}
      <th style="width: 125px;">포함 요소</th>
      <th style="width: 100px;">등록일자</th>
      <th style="width: 120px; text-align: center;">관리</th>
    `;
  }

  function populateSelectOptions() {
    const { channels, formats, categories, statuses } = appState.config;
    const stList = statuses && statuses.length ? statuses : ['대기중', '진행중', '완료'];

    const filterStatus = document.getElementById('filter-status');
    const filterChannel = document.getElementById('filter-channel');
    const filterFormat = document.getElementById('filter-format');
    const filterCategory = document.getElementById('filter-category');

    const formStatus = document.getElementById('form-status');
    const formChannel = document.getElementById('form-channel');
    const formFormat = document.getElementById('form-format');
    const formCategory = document.getElementById('form-category');

    if (filterStatus) {
      filterStatus.innerHTML = '<option value="">모든 진행상태 (전체)</option>' +
        stList.map(s => `<option value="${escapeHtml(s)}">${escapeHtml(s)}</option>`).join('');
      filterStatus.value = appState.filterStatus || '';
    }

    if (formStatus) {
      formStatus.innerHTML = stList.map(s => `<option value="${escapeHtml(s)}">${escapeHtml(s)}</option>`).join('');
    }

    if (filterChannel) {
      filterChannel.innerHTML = '<option value="">모든 채널 (전체)</option>' +
        channels.map(c => `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join('');
      filterChannel.value = appState.filterChannel || '';
    }

    if (formChannel) {
      formChannel.innerHTML = channels.map(c => `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join('');
    }

    if (filterFormat) {
      filterFormat.innerHTML = '<option value="">모든 형식 (전체)</option>' +
        formats.map(f => `<option value="${escapeHtml(f)}">${escapeHtml(f)}</option>`).join('');
      filterFormat.value = appState.filterFormat || '';
    }

    if (formFormat) {
      formFormat.innerHTML = formats.map(f => `<option value="${escapeHtml(f)}">${escapeHtml(f)}</option>`).join('');
    }

    if (filterCategory) {
      filterCategory.innerHTML = '<option value="">모든 유형 (전체)</option>' +
        categories.map(cat => `<option value="${escapeHtml(cat)}">${escapeHtml(cat)}</option>`).join('');
      filterCategory.value = appState.filterCategory || '';
    }

    if (formCategory) {
      formCategory.innerHTML = categories.map(cat => `<option value="${escapeHtml(cat)}">${escapeHtml(cat)}</option>`).join('');
    }
  }

  function renderFormCustomColumns(item = null) {
    const wrap = document.getElementById('form-custom-columns-wrap');
    const container = document.getElementById('form-custom-columns-container');
    if (!wrap || !container) return;

    const customCols = appState.config.customColumns || [];
    if (customCols.length === 0) {
      wrap.classList.add('hidden');
      container.innerHTML = '';
      return;
    }

    wrap.classList.remove('hidden');
    const currentValues = (item && item.customFields) || {};

    container.innerHTML = customCols.map(col => {
      const val = currentValues[col.id] || '';
      const hasOptions = Array.isArray(col.options) && col.options.length > 0;

      let inputControl = '';
      if (hasOptions) {
        inputControl = `
          <select id="form-custom-${col.id}" class="custom-col-input" data-col-id="${col.id}">
            <option value="">(선택 안함)</option>
            ${col.options.map(opt => `<option value="${escapeHtml(opt)}" ${opt === val ? 'selected' : ''}>${escapeHtml(opt)}</option>`).join('')}
          </select>
        `;
      } else {
        inputControl = `
          <input type="text" id="form-custom-${col.id}" class="custom-col-input" data-col-id="${col.id}" value="${escapeHtml(val)}" placeholder="${escapeHtml(col.name)} 입력">
        `;
      }

      return `
        <div class="form-group">
          <label for="form-custom-${col.id}">${escapeHtml(col.name)}</label>
          ${inputControl}
        </div>
      `;
    }).join('');
  }

  // ==========================================
  // 6. 콘텐츠 목록 렌더링 & 검색 & 필터링 (리스트 전용)
  // ==========================================
  function getFilteredAndSortedContents() {
    let list = [...appState.contents];

    const q = appState.searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter(item => {
        const title = (item.title || '').toLowerCase();
        const script = (item.script || '').toLowerCase();
        const imgP = (item.imagePrompt || '').toLowerCase();
        const vidP = (item.videoPrompt || '').toLowerCase();
        const notes = (item.notes || '').toLowerCase();
        return title.includes(q) || script.includes(q) || imgP.includes(q) || vidP.includes(q) || notes.includes(q);
      });
    }

    if (appState.filterStatus) {
      list = list.filter(item => (item.status || '대기중') === appState.filterStatus);
    }

    if (appState.filterChannel) {
      list = list.filter(item => item.channel === appState.filterChannel);
    }

    if (appState.filterFormat) {
      list = list.filter(item => item.format === appState.filterFormat);
    }

    if (appState.filterCategory) {
      list = list.filter(item => item.category === appState.filterCategory);
    }

    list.sort((a, b) => {
      if (appState.sortBy === 'created-desc') {
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      } else if (appState.sortBy === 'created-asc') {
        return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
      } else if (appState.sortBy === 'updated-desc') {
        return new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0);
      } else if (appState.sortBy === 'title-asc') {
        return (a.title || '').localeCompare(b.title || '');
      }
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });

    return list;
  }

  function renderContentList() {
    const filteredList = getFilteredAndSortedContents();
    const countEl = document.getElementById('filter-count');
    const resetBtn = document.getElementById('btn-reset-filters');
    const tableContainer = document.getElementById('content-table-container');
    const tableBody = document.getElementById('table-body');
    const emptyState = document.getElementById('empty-state');

    countEl.textContent = filteredList.length;

    const isFiltered = appState.searchQuery || appState.filterStatus || appState.filterChannel || appState.filterFormat || appState.filterCategory;
    resetBtn.classList.toggle('hidden', !isFiltered);

    if (filteredList.length === 0) {
      tableBody.innerHTML = '';
      tableContainer.classList.add('hidden');
      emptyState.classList.remove('hidden');
      return;
    }

    emptyState.classList.add('hidden');
    tableContainer.classList.remove('hidden');
    renderTable(filteredList, tableBody);
  }

  function renderTable(list, tbody) {
    const customCols = appState.config.customColumns || [];

    tbody.innerHTML = list.map(item => {
      const formatClass = item.format === '쇼츠' ? 'tag-format-shorts' : (item.format === '롱폼' ? 'tag-format-long' : 'tag-generic');
      const catClass = item.category === '광고' ? 'tag-category-ad' : 'tag-category-main';
      const statusBadge = getStatusBadgeHtml(item.status);

      const hasScript = Boolean(item.script && item.script.trim());
      const hasImage = Boolean(item.imagePrompt && item.imagePrompt.trim());
      const hasVideo = Boolean(item.videoPrompt && item.videoPrompt.trim());
      const hasNotes = Boolean(item.notes && item.notes.trim());
      const cmtCount = (item.comments || []).length;

      const customFields = item.customFields || {};
      const customCellsHtml = customCols.map(col => {
        const val = customFields[col.id];
        if (val) {
          return `<td><span class="tag-badge tag-custom-col" title="${escapeHtml(col.name)}: ${escapeHtml(val)}">${escapeHtml(val)}</span></td>`;
        }
        return `<td><span style="color:var(--text-light);font-size:12px;">-</span></td>`;
      }).join('');

      return `
        <tr data-id="${item.id}">
          <td>
            <div class="table-title">
              <span>${escapeHtml(item.title)}</span>
            </div>
          </td>
          <td>${statusBadge}</td>
          <td><span class="tag-badge tag-channel">${escapeHtml(item.channel || '-')}</span></td>
          <td><span class="tag-badge ${formatClass}">${escapeHtml(item.format || '-')}</span></td>
          <td><span class="tag-badge ${catClass}">${escapeHtml(item.category || '-')}</span></td>
          ${customCellsHtml}
          <td>
            <div class="element-pill-group">
              <span class="element-pill ${hasScript ? 'active' : ''}" title="대본 ${hasScript ? '작성됨' : '없음'}">대본</span>
              <span class="element-pill ${hasImage ? 'active' : ''}" title="이미지 프롬프트 ${hasImage ? '작성됨' : '없음'}">이미지</span>
              <span class="element-pill ${hasVideo ? 'active' : ''}" title="영상 프롬프트 ${hasVideo ? '작성됨' : '없음'}">영상</span>
              <span class="element-pill ${hasNotes ? 'active' : ''}" title="비고 ${hasNotes ? '작성됨' : '없음'}">비고</span>
              ${cmtCount > 0 ? `<span class="element-pill active element-pill-comment" title="댓글 ${cmtCount}개"><i class="fa-regular fa-comment"></i> ${cmtCount}</span>` : ''}
            </div>
          </td>
          <td>
            <div class="table-date-text" title="등록: ${formatFullDateTime(item.createdAt)}&#10;수정: ${formatFullDateTime(item.updatedAt)}">
              ${formatDisplayDate(item.createdAt || item.updatedAt)}
            </div>
          </td>
          <td>
            <div class="table-actions" onclick="event.stopPropagation()">
              <button class="btn-icon-sm btn-quick-view" data-id="${item.id}" title="상세보기">
                <i class="fa-regular fa-eye"></i>
              </button>
              <button class="btn-icon-sm btn-quick-edit" data-id="${item.id}" title="수정하기">
                <i class="fa-solid fa-pen"></i>
              </button>
              <button class="btn-icon-sm btn-quick-md" data-id="${item.id}" title="MD(마크다운) 파일로 내보내기">
                <i class="fa-regular fa-file-lines"></i>
              </button>
              <button class="btn-icon-sm btn-quick-del" data-id="${item.id}" title="삭제하기">
                <i class="fa-regular fa-trash-can"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    tbody.querySelectorAll('tr').forEach(row => {
      row.addEventListener('click', () => {
        openDetailModal(row.dataset.id);
      });
    });

    tbody.querySelectorAll('.btn-quick-view').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openDetailModal(btn.dataset.id);
      });
    });

    tbody.querySelectorAll('.btn-quick-edit').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        startEditing(btn.dataset.id);
      });
    });

    tbody.querySelectorAll('.btn-quick-md').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        exportSingleContentAsMd(btn.dataset.id);
      });
    });

    tbody.querySelectorAll('.btn-quick-del').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        promptDeleteContent(btn.dataset.id);
      });
    });
  }

  // ==========================================
  // 7. 상세 보기 모달
  // ==========================================
  function openDetailModal(id) {
    const item = appState.contents.find(c => c.id === id);
    if (!item) return;

    appState.activeModalId = id;

    const modal = document.getElementById('detail-modal');
    const tagsEl = document.getElementById('modal-tags');
    const titleEl = document.getElementById('modal-title');
    const createdEl = document.getElementById('modal-created');
    const updatedEl = document.getElementById('modal-updated');

    const scriptEl = document.getElementById('modal-script');
    const imageEl = document.getElementById('modal-image-prompt');
    const videoEl = document.getElementById('modal-video-prompt');
    const notesEl = document.getElementById('modal-notes');

    const formatClass = item.format === '쇼츠' ? 'tag-format-shorts' : (item.format === '롱폼' ? 'tag-format-long' : 'tag-generic');
    const catClass = item.category === '광고' ? 'tag-category-ad' : 'tag-category-main';
    const statusBadge = getStatusBadgeHtml(item.status);

    const customCols = appState.config.customColumns || [];
    const customFields = item.customFields || {};
    const customBadgesHtml = customCols.map(col => {
      const val = customFields[col.id];
      if (val) {
        return `<span class="tag-badge tag-custom-col" title="${escapeHtml(col.name)}"><i class="fa-solid fa-cube" style="margin-right:4px;"></i>${escapeHtml(col.name)}: ${escapeHtml(val)}</span>`;
      }
      return '';
    }).filter(Boolean).join('');

    tagsEl.innerHTML = `
      ${statusBadge}
      <span class="tag-badge tag-channel"><i class="fa-solid fa-tower-broadcast" style="margin-right:4px;"></i>${escapeHtml(item.channel)}</span>
      <span class="tag-badge ${formatClass}">${escapeHtml(item.format)}</span>
      <span class="tag-badge ${catClass}">${escapeHtml(item.category)}</span>
      ${customBadgesHtml}
    `;

    titleEl.textContent = item.title;
    createdEl.textContent = formatFullDateTime(item.createdAt);
    updatedEl.textContent = formatFullDateTime(item.updatedAt);

    scriptEl.textContent = item.script || '(작성된 대본이 없습니다.)';
    imageEl.textContent = item.imagePrompt || '(작성된 이미지 프롬프트가 없습니다.)';
    videoEl.textContent = item.videoPrompt || '(작성된 영상 프롬프트가 없습니다.)';
    notesEl.textContent = item.notes || '(작성된 비고사항이 없습니다.)';

    renderModalComments(item);

    modal.classList.remove('hidden');
  }

  function closeDetailModal() {
    const modal = document.getElementById('detail-modal');
    modal.classList.add('hidden');
    appState.activeModalId = null;

    const cmtInput = document.getElementById('comment-text-input');
    if (cmtInput) cmtInput.value = '';
  }

  // ==========================================
  // 7-1. 상세 보기 모달 내 댓글(피드백) 렌더링 & 관리
  // ==========================================
  function renderModalComments(item) {
    const listEl = document.getElementById('modal-comments-list');
    const countEl = document.getElementById('modal-comments-count');
    if (!listEl) return;

    const comments = Array.isArray(item.comments) ? item.comments : [];
    if (countEl) countEl.textContent = `${comments.length}`;

    if (comments.length === 0) {
      listEl.innerHTML = `
        <div class="empty-comments">
          <i class="fa-regular fa-comment-dots"></i>
          <span>아직 등록된 댓글이 없습니다. 첫 의견이나 피드백을 남겨보세요.</span>
        </div>
      `;
      return;
    }

    listEl.innerHTML = comments.map(cmt => `
      <div class="comment-item" data-comment-id="${cmt.id}">
        <div class="comment-item-header">
          <div class="comment-item-user">
            <span class="comment-avatar"><i class="fa-solid fa-user"></i></span>
            <span class="comment-author-name">${escapeHtml(cmt.author || '작성자')}</span>
            <span class="comment-time">${formatFullDateTime(cmt.createdAt)}</span>
          </div>
          <button type="button" class="btn-del-comment" data-comment-id="${cmt.id}" title="댓글 삭제">
            <i class="fa-regular fa-trash-can"></i>
          </button>
        </div>
        <div class="comment-item-content">${escapeHtml(cmt.text).replace(/\n/g, '<br>')}</div>
      </div>
    `).join('');

    listEl.querySelectorAll('.btn-del-comment').forEach(btn => {
      btn.addEventListener('click', () => {
        deleteComment(item.id, btn.dataset.commentId);
      });
    });
  }

  async function addComment(contentId) {
    const item = appState.contents.find(c => c.id === contentId);
    if (!item) return;

    const authorInput = document.getElementById('comment-author-input');
    const textInput = document.getElementById('comment-text-input');
    if (!textInput) return;

    const text = textInput.value.trim();
    if (!text) {
      showToast('댓글 내용을 입력해주세요.');
      textInput.focus();
      return;
    }

    const author = (authorInput && authorInput.value.trim()) ? authorInput.value.trim() : '작성자';

    if (!Array.isArray(item.comments)) {
      item.comments = [];
    }

    const newComment = {
      id: 'cmt-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      author,
      text,
      createdAt: new Date().toISOString()
    };

    item.comments.push(newComment);
    saveContentsToStorage();
    renderModalComments(item);
    renderContentList(); // 테이블 목록 내 댓글 카운트 뱃지 즉시 갱신
    textInput.value = '';

    if (db && isFirestoreConnected) {
      try {
        await db.collection('contents').doc(item.id).set(item);
        showToast('댓글이 등록되었습니다 (클라우드 동기화 완료)');
      } catch (err) {
        console.warn('Firestore 댓글 저장 실패:', err);
        showToast('댓글이 로컬에 저장되었습니다.');
      }
    } else {
      showToast('댓글이 등록되었습니다.');
    }
  }

  async function deleteComment(contentId, commentId) {
    const item = appState.contents.find(c => c.id === contentId);
    if (!item || !Array.isArray(item.comments)) return;

    if (!confirm('이 댓글을 삭제하시겠습니까?')) return;

    item.comments = item.comments.filter(c => c.id !== commentId);
    saveContentsToStorage();
    renderModalComments(item);
    renderContentList(); // 테이블 목록 내 댓글 카운트 뱃지 즉시 갱신

    if (db && isFirestoreConnected) {
      try {
        await db.collection('contents').doc(item.id).set(item);
        showToast('댓글이 삭제되었습니다.');
      } catch (err) {
        console.warn('Firestore 댓글 삭제 동기화 실패:', err);
        showToast('댓글이 삭제되었습니다 (로컬)');
      }
    } else {
      showToast('댓글이 삭제되었습니다.');
    }
  }

  // ==========================================
  // 8. 개별 콘텐츠 마크다운(MD) 파일 내보내기
  // ==========================================
  function exportSingleContentAsMd(id) {
    const item = appState.contents.find(c => c.id === id);
    if (!item) {
      showToast('콘텐츠를 찾을 수 없습니다.');
      return;
    }

    const createdStr = formatFullDateTime(item.createdAt);
    const updatedStr = formatFullDateTime(item.updatedAt);

    const customCols = appState.config.customColumns || [];
    const customFields = item.customFields || {};
    const customLines = customCols.map(col => {
      const val = customFields[col.id] || '미지정';
      return `- **${col.name}**: ${val}`;
    });

    const commentLines = (item.comments && item.comments.length > 0) ? [
      '',
      `---`,
      '',
      `## 💬 피드백 및 댓글 (${item.comments.length})`,
      ...item.comments.map(c => `- **[${formatFullDateTime(c.createdAt)}] ${c.author || '작성자'}**: ${c.text}`),
    ] : [];

    const mdLines = [
      `# ${item.title || '제목 없음'}`,
      '',
      `## 📌 콘텐츠 메타 정보`,
      `- **진행상태**: ${item.status || '대기중'}`,
      `- **채널명**: ${item.channel || '미지정'}`,
      `- **영상 형식**: ${item.format || '미지정'}`,
      `- **콘텐츠 유형**: ${item.category || '미지정'}`,
      ...customLines,
      `- **생성 일자**: ${createdStr}`,
      `- **최근 수정 일자**: ${updatedStr}`,
      '',
      `---`,
      '',
      `## 📜 대본 (Script)`,
      item.script ? item.script : '*(작성된 대본이 없습니다)*',
      '',
      `---`,
      '',
      `## 🎨 이미지 프롬프트 (Image Prompt)`,
      '```text',
      item.imagePrompt ? item.imagePrompt : '(작성된 이미지 프롬프트가 없습니다)',
      '```',
      '',
      `---`,
      '',
      `## 🎥 영상 프롬프트 (Video Prompt)`,
      '```text',
      item.videoPrompt ? item.videoPrompt : '(작성된 영상 프롬프트가 없습니다)',
      '```',
      '',
      `---`,
      '',
      `## 📝 비고 및 메모 (Notes)`,
      item.notes ? item.notes : '*(작성된 비고사항이 없습니다)*',
      ...commentLines,
      '',
      `---`,
      `*Generated by Prompt Studio - ${new Date().toISOString().slice(0, 10)}*`
    ];

    const mdContent = mdLines.join('\n');
    const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    // 파일명 생성: [진행상태][채널명][형식]_제목_날짜.md (특수문자 정제)
    const cleanTitle = (item.title || 'content').replace(/[\/\\?%*:|"<>]/g, '_').trim().slice(0, 40);
    const filename = `[${item.status || '상태'}][${item.channel || '채널'}][${item.format || '형식'}]_${cleanTitle}.md`;

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast(`'${filename}' 파일이 다운로드되었습니다.`);
  }

  // ==========================================
  // 9. 커스텀 삭제 확인 모달 로직
  // ==========================================
  function promptDeleteContent(id) {
    const item = appState.contents.find(c => c.id === id);
    if (!item) return;

    appState.deleteTargetId = id;

    const modal = document.getElementById('delete-confirm-modal');
    const titleEl = document.getElementById('delete-target-title');
    if (titleEl) titleEl.textContent = item.title;

    modal.classList.remove('hidden');
  }

  function closeDeleteModal() {
    const modal = document.getElementById('delete-confirm-modal');
    modal.classList.add('hidden');
    appState.deleteTargetId = null;
  }

  async function executeDeleteContent() {
    const id = appState.deleteTargetId;
    if (!id) return;

    appState.contents = appState.contents.filter(c => c.id !== id);
    saveContentsToStorage();

    closeDeleteModal();

    if (appState.activeModalId === id) {
      closeDetailModal();
    }

    renderContentList();

    if (db && isFirestoreConnected) {
      try {
        await db.collection('contents').doc(id).delete();
        showToast('클라우드에서 콘텐츠가 삭제되었습니다.');
      } catch (err) {
        console.error('Firestore 삭제 오류:', err);
        showToast('로컬에서 삭제되었습니다. (클라우드 삭제 실패: 보안 규칙 확인)');
      }
    } else {
      showToast('콘텐츠가 안전하게 삭제되었습니다.');
    }
  }

  // ==========================================
  // 10. 필수 참고 프롬프트 전용 모달 로직
  // ==========================================
  function openRefModal(refId) {
    const modal = document.getElementById('ref-prompt-modal');
    modal.classList.remove('hidden');
    selectRefPrompt(refId || appState.activeRefId || 'ref-01');
  }

  function closeRefModal() {
    const modal = document.getElementById('ref-prompt-modal');
    modal.classList.add('hidden');
  }

  function renderRefPromptTabs() {
    const container = document.getElementById('ref-tab-list');
    if (!container) return;

    container.innerHTML = REFERENCE_PROMPTS.map(ref => `
      <button class="ref-tab-item ${ref.id === appState.activeRefId ? 'active' : ''}" data-id="${ref.id}">
        <span class="ref-item-num">${ref.num}</span>
        <div class="ref-item-info">
          <div class="ref-item-title">${escapeHtml(ref.title)}</div>
          <span class="ref-item-desc">${escapeHtml(ref.desc)}</span>
        </div>
      </button>
    `).join('');

    container.querySelectorAll('.ref-tab-item').forEach(btn => {
      btn.addEventListener('click', () => {
        selectRefPrompt(btn.dataset.id);
      });
    });
  }

  function selectRefPrompt(id) {
    const ref = REFERENCE_PROMPTS.find(r => r.id === id) || REFERENCE_PROMPTS[0];
    appState.activeRefId = ref.id;

    document.querySelectorAll('.ref-tab-item').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.id === ref.id);
    });

    const titleEl = document.getElementById('ref-current-title');
    const statsEl = document.getElementById('ref-current-stats');
    const codeEl = document.getElementById('ref-code-content');

    if (titleEl) titleEl.textContent = ref.title;
    if (codeEl) codeEl.textContent = ref.content;

    const charCount = ref.content.length;
    const lineCount = ref.content.split('\n').length;
    if (statsEl) {
      statsEl.textContent = `${charCount.toLocaleString()}자 · ${lineCount.toLocaleString()}줄`;
    }

    const wrapEl = document.querySelector('.ref-code-viewer-wrap');
    if (wrapEl) wrapEl.scrollTop = 0;
  }

  function copyActiveRefPrompt() {
    const ref = REFERENCE_PROMPTS.find(r => r.id === appState.activeRefId);
    if (ref && ref.content) {
      copyToClipboard(ref.content, `'${ref.title}' 복사 완료!`);
    }
  }

  // ==========================================
  // 11. 콘텐츠 작성 및 수정 (Editor)
  // ==========================================
  function resetEditorForm() {
    document.getElementById('content-form').reset();
    document.getElementById('edit-id').value = '';
    document.getElementById('editor-mode-badge').textContent = '새 콘텐츠 작성';
    document.getElementById('editor-form-title').textContent = '콘텐츠 프롬프트 및 대본 입력';

    const defaultStatus = (appState.config.statuses && appState.config.statuses[0]) || '대기중';
    const formStatus = document.getElementById('form-status');
    if (formStatus) formStatus.value = defaultStatus;

    const nowIso = getLocalIsoString(new Date());
    document.getElementById('form-created-at').value = nowIso;
    document.getElementById('form-updated-at').value = nowIso;
    document.getElementById('script-counter').textContent = '0자';

    renderFormCustomColumns(null);
  }

  function startEditing(id) {
    const item = appState.contents.find(c => c.id === id);
    if (!item) return;

    resetEditorForm();

    document.getElementById('edit-id').value = item.id;
    document.getElementById('editor-mode-badge').textContent = '기존 콘텐츠 수정';
    document.getElementById('editor-form-title').textContent = `수정 중: ${item.title}`;

    document.getElementById('form-title').value = item.title || '';
    const formStatus = document.getElementById('form-status');
    if (formStatus) formStatus.value = item.status || '대기중';

    document.getElementById('form-channel').value = item.channel || appState.config.channels[0];
    document.getElementById('form-format').value = item.format || appState.config.formats[0];
    document.getElementById('form-category').value = item.category || appState.config.categories[0];

    document.getElementById('form-created-at').value = item.createdAt ? item.createdAt.substring(0, 16) : getLocalIsoString(new Date());
    document.getElementById('form-updated-at').value = getLocalIsoString(new Date());

    document.getElementById('form-script').value = item.script || '';
    document.getElementById('form-image-prompt').value = item.imagePrompt || '';
    document.getElementById('form-video-prompt').value = item.videoPrompt || '';
    document.getElementById('form-notes').value = item.notes || '';

    renderFormCustomColumns(item);
    updateScriptCharCount();

    closeDetailModal();
    switchTab('tab-editor');
  }

  async function saveCurrentContent() {
    const editId = document.getElementById('edit-id').value;
    const title = document.getElementById('form-title').value.trim();
    const formStatusEl = document.getElementById('form-status');
    const status = formStatusEl ? formStatusEl.value : '대기중';
    const channel = document.getElementById('form-channel').value;
    const format = document.getElementById('form-format').value;
    const category = document.getElementById('form-category').value;
    const script = document.getElementById('form-script').value;
    const imagePrompt = document.getElementById('form-image-prompt').value;
    const videoPrompt = document.getElementById('form-video-prompt').value;
    const notes = document.getElementById('form-notes').value;

    if (!title) {
      showToast('콘텐츠 제목을 입력해주세요.');
      document.getElementById('form-title').focus();
      return;
    }

    // 사용자 정의 컬럼 필드값 수집
    const customFields = {};
    const customInputs = document.querySelectorAll('.custom-col-input');
    customInputs.forEach(input => {
      const colId = input.dataset.colId;
      if (colId) {
        customFields[colId] = input.value.trim();
      }
    });

    const now = new Date().toISOString();
    let targetItem = null;

    if (editId) {
      const idx = appState.contents.findIndex(c => c.id === editId);
      if (idx !== -1) {
        targetItem = {
          ...appState.contents[idx],
          title,
          status,
          channel,
          format,
          category,
          customFields,
          script,
          imagePrompt,
          videoPrompt,
          notes,
          updatedAt: now
        };
        appState.contents[idx] = targetItem;
      }
    } else {
      targetItem = {
        id: 'item-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
        title,
        status,
        channel,
        format,
        category,
        customFields,
        script,
        imagePrompt,
        videoPrompt,
        notes,
        createdAt: now,
        updatedAt: now
      };
      appState.contents.unshift(targetItem);
    }

    saveContentsToStorage();
    switchTab('tab-list');

    if (db && isFirestoreConnected && targetItem) {
      try {
        await db.collection('contents').doc(targetItem.id).set(targetItem);
        showToast(editId ? '클라우드에 수정 저장되었습니다!' : '클라우드에 새 콘텐츠가 저장되었습니다!');
      } catch (err) {
        console.error('Firestore 저장 오류:', err);
        showToast('로컬에 저장되었습니다 (클라우드 권한 확인 필요)');
      }
    } else {
      showToast(editId ? '콘텐츠가 성공적으로 수정되었습니다.' : '새로운 콘텐츠가 저장되었습니다.');
    }
  }

  function updateScriptCharCount() {
    const val = document.getElementById('form-script').value;
    const counter = document.getElementById('script-counter');
    if (counter) {
      counter.textContent = `${val.length.toLocaleString()}자`;
    }
  }

  // ==========================================
  // 12. 컴팩트 대시보드 통계 & Chart.js 렌더링
  // ==========================================
  function renderDashboard() {
    const contents = appState.contents;

    const totalCount = contents.length;
    const longCount = contents.filter(c => c.format === '롱폼').length;
    const shortsCount = contents.filter(c => c.format === '쇼츠').length;
    const adCount = contents.filter(c => c.category === '광고').length;

    document.getElementById('kpi-total-count').textContent = totalCount.toLocaleString();
    document.getElementById('kpi-long-count').textContent = longCount.toLocaleString();
    document.getElementById('kpi-shorts-count').textContent = shortsCount.toLocaleString();
    document.getElementById('kpi-ad-count').textContent = adCount.toLocaleString();

    const channelCounts = {};
    appState.config.channels.forEach(ch => { channelCounts[ch] = 0; });
    contents.forEach(c => {
      const ch = c.channel || '기타';
      channelCounts[ch] = (channelCounts[ch] || 0) + 1;
    });

    const formatCounts = {};
    appState.config.formats.forEach(f => { formatCounts[f] = 0; });
    contents.forEach(c => {
      const f = c.format || '기타';
      formatCounts[f] = (formatCounts[f] || 0) + 1;
    });

    const categoryCounts = {};
    appState.config.categories.forEach(cat => { categoryCounts[cat] = 0; });
    contents.forEach(c => {
      const cat = c.category || '기타';
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    });

    const trendMap = {};
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}`;
      trendMap[key] = 0;
    }
    contents.forEach(c => {
      if (c.createdAt) {
        const d = new Date(c.createdAt);
        const key = `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}`;
        if (trendMap.hasOwnProperty(key)) {
          trendMap[key]++;
        }
      }
    });

    initChannelChart(channelCounts);
    initFormatChart(formatCounts);
    initCategoryChart(categoryCounts);
    initTrendChart(trendMap);
  }

  function initChannelChart(channelData) {
    const ctx = document.getElementById('chart-channel').getContext('2d');
    if (appState.charts.channel) appState.charts.channel.destroy();

    const labels = Object.keys(channelData);
    const data = Object.values(channelData);
    const colors = ['#3b82f6', '#ec4899', '#10b981', '#f59e0b', '#8b5cf6', '#64748b'];

    appState.charts.channel = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: colors.slice(0, labels.length),
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { boxWidth: 10, padding: 8, font: { size: 11 } } }
        },
        cutout: '68%'
      }
    });
  }

  function initFormatChart(formatData) {
    const ctx = document.getElementById('chart-format').getContext('2d');
    if (appState.charts.format) appState.charts.format.destroy();

    const labels = Object.keys(formatData);
    const data = Object.values(formatData);

    appState.charts.format = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: '콘텐츠 건수',
          data: data,
          backgroundColor: labels.map(l => l === '쇼츠' ? '#f43f5e' : '#4f46e5'),
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: { ticks: { font: { size: 11 } } },
          y: {
            beginAtZero: true,
            ticks: { precision: 0, stepSize: 1, font: { size: 10 } }
          }
        }
      }
    });
  }

  function initCategoryChart(categoryData) {
    const ctx = document.getElementById('chart-category').getContext('2d');
    if (appState.charts.category) appState.charts.category.destroy();

    const labels = Object.keys(categoryData);
    const data = Object.values(categoryData);
    const colors = ['#10b981', '#a855f7', '#06b6d4', '#f97316'];

    appState.charts.category = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: colors.slice(0, labels.length),
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { boxWidth: 10, padding: 8, font: { size: 11 } } }
        }
      }
    });
  }

  function initTrendChart(trendMap) {
    const ctx = document.getElementById('chart-trend').getContext('2d');
    if (appState.charts.trend) appState.charts.trend.destroy();

    const labels = Object.keys(trendMap);
    const data = Object.values(trendMap);

    appState.charts.trend = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: '신규 등록 수',
          data: data,
          borderColor: '#2563eb',
          backgroundColor: 'rgba(37, 99, 235, 0.08)',
          fill: true,
          tension: 0.35,
          pointBackgroundColor: '#2563eb',
          pointRadius: 3,
          pointHoverRadius: 5
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: { ticks: { font: { size: 10 } } },
          y: {
            beginAtZero: true,
            ticks: { precision: 0, stepSize: 1, font: { size: 10 } }
          }
        }
      }
    });
  }

  // ==========================================
  // 13. 분류 & 항목 설정 (Settings / Backend config)
  // ==========================================
  function renderSettings() {
    renderConfigList('status-item-list', appState.config.statuses || ['대기중', '진행중', '완료'], 'badge-status-count', (idx) => {
      if ((appState.config.statuses || []).length <= 1) {
        showToast('최소 1개 이상의 진행상태가 필요합니다.');
        return;
      }
      appState.config.statuses.splice(idx, 1);
      saveConfigToStorage();
      populateSelectOptions();
      renderSettings();
      renderContentList();
      showToast('진행상태가 삭제되었습니다.');
    });

    renderConfigList('channel-item-list', appState.config.channels, 'badge-channel-count', (idx) => {
      if (appState.config.channels.length <= 1) {
        showToast('최소 1개 이상의 채널이 필요합니다.');
        return;
      }
      appState.config.channels.splice(idx, 1);
      saveConfigToStorage();
      populateSelectOptions();
      renderSettings();
      showToast('채널이 삭제되었습니다.');
    });

    renderConfigList('format-item-list', appState.config.formats, 'badge-format-count', (idx) => {
      if (appState.config.formats.length <= 1) {
        showToast('최소 1개 이상의 영상 형식이 필요합니다.');
        return;
      }
      appState.config.formats.splice(idx, 1);
      saveConfigToStorage();
      populateSelectOptions();
      renderSettings();
      showToast('영상 형식이 삭제되었습니다.');
    });

    renderConfigList('category-item-list', appState.config.categories, 'badge-category-count', (idx) => {
      if (appState.config.categories.length <= 1) {
        showToast('최소 1개 이상의 콘텐츠 유형이 필요합니다.');
        return;
      }
      appState.config.categories.splice(idx, 1);
      saveConfigToStorage();
      populateSelectOptions();
      renderSettings();
      showToast('콘텐츠 유형이 삭제되었습니다.');
    });

    renderCustomColumnsSettings();
  }

  function renderCustomColumnsSettings() {
    const customCols = appState.config.customColumns || [];
    const countBadge = document.getElementById('badge-custom-cols-count');
    if (countBadge) countBadge.textContent = `${customCols.length}개`;

    const grid = document.getElementById('custom-columns-grid');
    if (!grid) return;

    if (customCols.length === 0) {
      grid.innerHTML = `
        <div class="empty-custom-cols" style="grid-column: 1 / -1; padding: 24px; text-align: center; color: var(--text-light); background: var(--bg-hover); border-radius: var(--radius-md); border: 1px dashed var(--border-color);">
          <i class="fa-solid fa-table-columns" style="font-size: 24px; margin-bottom: 8px; display: block; opacity: 0.6;"></i>
          <span>등록된 사용자 정의 컬럼이 없습니다. 상단에서 새 컬럼을 추가해보세요.</span>
        </div>
      `;
      return;
    }

    grid.innerHTML = customCols.map(col => {
      const options = col.options || [];
      const optionsBadges = options.map((opt, optIdx) => `
        <span class="custom-col-tag">
          ${escapeHtml(opt)}
          <button type="button" class="btn-del-subopt" data-col-id="${col.id}" data-opt-idx="${optIdx}" title="삭제">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </span>
      `).join('');

      return `
        <div class="custom-col-card" data-col-id="${col.id}">
          <div class="custom-col-header">
            <div class="custom-col-title-wrap">
              <span class="custom-col-name">${escapeHtml(col.name)}</span>
              <span class="custom-col-type">소 항목 ${options.length}개</span>
            </div>
            <button type="button" class="btn-del-custom-col" data-col-id="${col.id}" title="컬럼 삭제">
              <i class="fa-regular fa-trash-can"></i> 삭제
            </button>
          </div>

          <div class="custom-col-body">
            <div class="sub-col-desc">소 컬럼 (선택 옵션 목록):</div>
            <div class="custom-sub-options-list">
              ${optionsBadges || '<span style="color:var(--text-light);font-size:12px;">(선택 옵션 없음 - 작성 시 자유 텍스트 입력창 제공)</span>'}
            </div>
            <div class="add-sub-opt-wrap">
              <input type="text" class="input-new-subopt" data-col-id="${col.id}" placeholder="소 항목(옵션) 추가 후 Enter">
              <button type="button" class="btn btn-sm btn-outline btn-add-subopt" data-col-id="${col.id}">추가</button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // 이벤트 리스너 연결
    grid.querySelectorAll('.btn-del-custom-col').forEach(btn => {
      btn.addEventListener('click', () => {
        deleteCustomColumn(btn.dataset.colId);
      });
    });

    grid.querySelectorAll('.btn-add-subopt').forEach(btn => {
      btn.addEventListener('click', () => {
        const colId = btn.dataset.colId;
        const input = grid.querySelector(`.input-new-subopt[data-col-id="${colId}"]`);
        if (input) {
          addSubColumnOption(colId, input.value.trim());
          input.value = '';
        }
      });
    });

    grid.querySelectorAll('.input-new-subopt').forEach(input => {
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          const colId = input.dataset.colId;
          addSubColumnOption(colId, input.value.trim());
          input.value = '';
        }
      });
    });

    grid.querySelectorAll('.btn-del-subopt').forEach(btn => {
      btn.addEventListener('click', () => {
        deleteSubColumnOption(btn.dataset.colId, parseInt(btn.dataset.optIdx, 10));
      });
    });
  }

  function createCustomColumn(colName) {
    const name = (colName || '').trim();
    if (!name) {
      showToast('새 컬럼명을 입력해주세요.');
      return;
    }

    if (!appState.config.customColumns) {
      appState.config.customColumns = [];
    }

    if (appState.config.customColumns.some(c => c.name === name)) {
      showToast('이미 존재하는 컬럼명입니다.');
      return;
    }

    const newCol = {
      id: 'col_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      name: name,
      options: []
    };

    appState.config.customColumns.push(newCol);
    saveConfigToStorage();
    renderTableHeader();
    renderSettings();
    renderFormCustomColumns();
    renderContentList();
    showToast(`새 컬럼 '${name}'이(가) 추가되었습니다.`);
  }

  function deleteCustomColumn(colId) {
    if (!confirm('이 컬럼을 삭제하시겠습니까? (콘텐츠에 저장된 해당 필드 데이터는 보존됩니다)')) return;

    appState.config.customColumns = (appState.config.customColumns || []).filter(c => c.id !== colId);
    saveConfigToStorage();
    renderTableHeader();
    renderSettings();
    renderFormCustomColumns();
    renderContentList();
    showToast('컬럼이 삭제되었습니다.');
  }

  function addSubColumnOption(colId, optVal) {
    const val = (optVal || '').trim();
    if (!val) {
      showToast('추가할 소 항목(옵션)을 입력해주세요.');
      return;
    }

    const col = (appState.config.customColumns || []).find(c => c.id === colId);
    if (!col) return;

    if (!col.options) col.options = [];
    if (col.options.includes(val)) {
      showToast('이미 존재하는 소 항목입니다.');
      return;
    }

    col.options.push(val);
    saveConfigToStorage();
    renderSettings();
    renderFormCustomColumns();
    showToast(`'${col.name}'에 소 항목 '${val}'이(가) 추가되었습니다.`);
  }

  function deleteSubColumnOption(colId, optIdx) {
    const col = (appState.config.customColumns || []).find(c => c.id === colId);
    if (!col || !col.options) return;

    col.options.splice(optIdx, 1);
    saveConfigToStorage();
    renderSettings();
    renderFormCustomColumns();
    showToast('소 항목이 삭제되었습니다.');
  }

  function renderConfigList(containerId, list, badgeId, onDelete) {
    const container = document.getElementById(containerId);
    const badge = document.getElementById(badgeId);
    if (badge) badge.textContent = `${list.length}개`;

    container.innerHTML = list.map((item, index) => `
      <li class="settings-item-row">
        <span>${escapeHtml(item)}</span>
        <button class="btn-item-del" data-index="${index}" title="${escapeHtml(item)} 삭제">
          <i class="fa-regular fa-trash-can"></i>
        </button>
      </li>
    `).join('');

    container.querySelectorAll('.btn-item-del').forEach(btn => {
      btn.addEventListener('click', () => {
        onDelete(parseInt(btn.dataset.index, 10));
      });
    });
  }

  function addConfigItem(type, inputId) {
    const input = document.getElementById(inputId);
    const val = input.value.trim();
    if (!val) {
      showToast('추가할 항목명을 입력하세요.');
      return;
    }

    if (type === 'status') {
      if (!appState.config.statuses) appState.config.statuses = ['대기중', '진행중', '완료'];
      if (appState.config.statuses.includes(val)) {
        showToast('이미 존재하는 진행상태입니다.');
        return;
      }
      appState.config.statuses.push(val);
    } else if (type === 'channel') {
      if (appState.config.channels.includes(val)) {
        showToast('이미 존재하는 채널명입니다.');
        return;
      }
      appState.config.channels.push(val);
    } else if (type === 'format') {
      if (appState.config.formats.includes(val)) {
        showToast('이미 존재하는 영상 형식입니다.');
        return;
      }
      appState.config.formats.push(val);
    } else if (type === 'category') {
      if (appState.config.categories.includes(val)) {
        showToast('이미 존재하는 콘텐츠 유형입니다.');
        return;
      }
      appState.config.categories.push(val);
    }

    input.value = '';
    saveConfigToStorage();
    populateSelectOptions();
    renderSettings();
    showToast(`'${val}' 항목이 추가되었습니다.`);
  }

  // ==========================================
  // 14. 데이터 백업 및 복원 (JSON)
  // ==========================================
  function exportDataAsJson() {
    const backupData = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      config: appState.config,
      contents: appState.contents
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement('a');
    const filename = `prompt_studio_backup_${new Date().toISOString().slice(0, 10)}.json`;

    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', filename);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    showToast('전체 데이터 백업 파일이 다운로드되었습니다.');
  }

  function importDataFromJson(file) {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const parsed = JSON.parse(e.target.result);
        if (Array.isArray(parsed)) {
          appState.contents = parsed;
        } else if (parsed.contents && Array.isArray(parsed.contents)) {
          appState.contents = parsed.contents;
          if (parsed.config) {
            appState.config = {
              statuses: parsed.config.statuses || DEFAULT_CONFIG.statuses,
              channels: parsed.config.channels || DEFAULT_CONFIG.channels,
              formats: parsed.config.formats || DEFAULT_CONFIG.formats,
              categories: parsed.config.categories || DEFAULT_CONFIG.categories,
              customColumns: parsed.config.customColumns || DEFAULT_CONFIG.customColumns
            };
          }
        } else {
          throw new Error('올바르지 않은 백업 파일 형식입니다.');
        }

        saveContentsToStorage();
        saveConfigToStorage();
        populateSelectOptions();
        renderTableHeader();
        renderFormCustomColumns();
        renderContentList();
        renderSettings();
        showToast('데이터가 성공적으로 복원되었습니다!');
      } catch (err) {
        alert('파일을 불러오는 중 오류가 발생했습니다: ' + err.message);
      }
    };
    reader.readAsText(file);
  }

  // ==========================================
  // 15. 유틸리티 함수
  // ==========================================
  function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toast.timeoutId);
    toast.timeoutId = setTimeout(() => {
      toast.classList.remove('show');
    }, 2400);
  }

  function copyToClipboard(text, successMsg) {
    if (!navigator.clipboard) {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showToast(successMsg || '복사되었습니다.');
      return;
    }

    navigator.clipboard.writeText(text).then(() => {
      showToast(successMsg || '클립보드에 복사되었습니다.');
    }).catch(err => {
      console.error('클립보드 복사 실패:', err);
      showToast('복사에 실패했습니다.');
    });
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function formatDisplayDate(dateStr) {
    if (!dateStr) return '-';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${y}.${m}.${day}`;
    } catch {
      return dateStr;
    }
  }

  function formatFullDateTime(dateStr) {
    if (!dateStr) return '-';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const h = String(d.getHours()).padStart(2, '0');
      const min = String(d.getMinutes()).padStart(2, '0');
      return `${y}.${m}.${day} ${h}:${min}`;
    } catch {
      return dateStr;
    }
  }

  function getLocalIsoString(date) {
    const tzOffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - tzOffset).toISOString().slice(0, 16);
  }

  // ==========================================
  // 16. 이벤트 리스너 등록 & 초기화
  // ==========================================
  function setupEventListeners() {
    // 사이드바 탭 전환
    document.querySelectorAll('.sidebar-menu .menu-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        if (tab === 'tab-editor') {
          resetEditorForm();
        }
        switchTab(tab);
      });
    });

    // 헤더 "새 콘텐츠 등록" 버튼
    document.getElementById('btn-header-new').addEventListener('click', () => {
      resetEditorForm();
      switchTab('tab-editor');
    });

    // 검색창 & 지우기 버튼
    const searchInput = document.getElementById('search-input');
    const searchClear = document.getElementById('search-clear-btn');

    searchInput.addEventListener('input', (e) => {
      appState.searchQuery = e.target.value;
      searchClear.classList.toggle('hidden', !e.target.value);
      renderContentList();
    });

    searchClear.addEventListener('click', () => {
      searchInput.value = '';
      appState.searchQuery = '';
      searchClear.classList.add('hidden');
      renderContentList();
    });

    // 필터 체인지
    const filterStatus = document.getElementById('filter-status');
    if (filterStatus) {
      filterStatus.addEventListener('change', (e) => {
        appState.filterStatus = e.target.value;
        renderContentList();
      });
    }

    document.getElementById('filter-channel').addEventListener('change', (e) => {
      appState.filterChannel = e.target.value;
      renderContentList();
    });

    document.getElementById('filter-format').addEventListener('change', (e) => {
      appState.filterFormat = e.target.value;
      renderContentList();
    });

    document.getElementById('filter-category').addEventListener('change', (e) => {
      appState.filterCategory = e.target.value;
      renderContentList();
    });

    document.getElementById('sort-order').addEventListener('change', (e) => {
      appState.sortBy = e.target.value;
      renderContentList();
    });

    // 필터 초기화 버튼
    document.getElementById('btn-reset-filters').addEventListener('click', () => {
      appState.searchQuery = '';
      appState.filterStatus = '';
      appState.filterChannel = '';
      appState.filterFormat = '';
      appState.filterCategory = '';
      appState.sortBy = 'created-desc';

      searchInput.value = '';
      searchClear.classList.add('hidden');
      const filterStatusEl = document.getElementById('filter-status');
      if (filterStatusEl) filterStatusEl.value = '';
      document.getElementById('filter-channel').value = '';
      document.getElementById('filter-format').value = '';
      document.getElementById('filter-category').value = '';
      document.getElementById('sort-order').value = 'created-desc';

      renderContentList();
    });

    // 에디터 폼 서브밋 & 저장
    document.getElementById('content-form').addEventListener('submit', (e) => {
      e.preventDefault();
      saveCurrentContent();
    });

    document.getElementById('btn-save-content').addEventListener('click', () => {
      saveCurrentContent();
    });

    document.getElementById('btn-cancel-edit').addEventListener('click', () => {
      switchTab('tab-list');
    });

    document.getElementById('btn-cancel-bottom').addEventListener('click', () => {
      switchTab('tab-list');
    });

    document.getElementById('form-script').addEventListener('input', updateScriptCharCount);

    document.querySelectorAll('.btn-copy-tool[data-target]').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.dataset.target;
        const targetInput = document.getElementById(targetId);
        if (targetInput && targetInput.value) {
          copyToClipboard(targetInput.value, '내용이 복사되었습니다.');
        } else {
          showToast('복사할 내용이 없습니다.');
        }
      });
    });

    document.getElementById('btn-empty-create').addEventListener('click', () => {
      resetEditorForm();
      switchTab('tab-editor');
    });

    // 상세 모달 이벤트
    document.getElementById('btn-close-modal').addEventListener('click', closeDetailModal);
    document.getElementById('btn-modal-close-bottom').addEventListener('click', closeDetailModal);

    document.getElementById('detail-modal').addEventListener('click', (e) => {
      if (e.target.id === 'detail-modal') {
        closeDetailModal();
      }
    });

    document.getElementById('btn-modal-edit').addEventListener('click', () => {
      if (appState.activeModalId) {
        startEditing(appState.activeModalId);
      }
    });

    // 상세 모달 내 삭제 버튼 -> 커스텀 확인 모달 띄우기
    document.getElementById('btn-modal-delete').addEventListener('click', () => {
      if (appState.activeModalId) {
        promptDeleteContent(appState.activeModalId);
      }
    });

    // 상세 모달 내 MD 내보내기 버튼
    document.getElementById('btn-modal-export-md').addEventListener('click', () => {
      if (appState.activeModalId) {
        exportSingleContentAsMd(appState.activeModalId);
      }
    });

    document.getElementById('btn-modal-copy-script').addEventListener('click', () => {
      const item = appState.contents.find(c => c.id === appState.activeModalId);
      if (item && item.script) copyToClipboard(item.script, '대본이 복사되었습니다.');
    });

    document.getElementById('btn-modal-copy-image').addEventListener('click', () => {
      const item = appState.contents.find(c => c.id === appState.activeModalId);
      if (item && item.imagePrompt) copyToClipboard(item.imagePrompt, '이미지 프롬프트가 복사되었습니다.');
    });

    document.getElementById('btn-modal-copy-video').addEventListener('click', () => {
      const item = appState.contents.find(c => c.id === appState.activeModalId);
      if (item && item.videoPrompt) copyToClipboard(item.videoPrompt, '영상 프롬프트가 복사되었습니다.');
    });

    document.getElementById('btn-modal-copy-notes').addEventListener('click', () => {
      const item = appState.contents.find(c => c.id === appState.activeModalId);
      if (item && item.notes) copyToClipboard(item.notes, '비고 내용이 복사되었습니다.');
    });

    // 상세 모달 내 댓글 등록 이벤트
    const btnSubmitComment = document.getElementById('btn-submit-comment');
    if (btnSubmitComment) {
      btnSubmitComment.addEventListener('click', () => {
        if (appState.activeModalId) {
          addComment(appState.activeModalId);
        }
      });
    }

    const commentTextInput = document.getElementById('comment-text-input');
    if (commentTextInput) {
      commentTextInput.addEventListener('keydown', (e) => {
        // Enter 단독 등록 (Shift+Enter는 줄바꿈)
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          if (appState.activeModalId) {
            addComment(appState.activeModalId);
          }
        }
      });
    }

    // ==========================================
    // 삭제 확인 모달 이벤트
    // ==========================================
    document.getElementById('btn-cancel-delete').addEventListener('click', closeDeleteModal);
    document.getElementById('btn-confirm-delete').addEventListener('click', executeDeleteContent);

    document.getElementById('delete-confirm-modal').addEventListener('click', (e) => {
      if (e.target.id === 'delete-confirm-modal') {
        closeDeleteModal();
      }
    });

    // 필수 참고 프롬프트 모달 이벤트 리스너
    const openRefModalBtn = document.getElementById('btn-open-ref-modal');
    if (openRefModalBtn) {
      openRefModalBtn.addEventListener('click', () => {
        openRefModal();
      });
    }

    const closeRefModalBtn = document.getElementById('btn-close-ref-modal');
    if (closeRefModalBtn) closeRefModalBtn.addEventListener('click', closeRefModal);

    const closeRefBottomBtn = document.getElementById('btn-close-ref-bottom');
    if (closeRefBottomBtn) closeRefBottomBtn.addEventListener('click', closeRefModal);

    const refModal = document.getElementById('ref-prompt-modal');
    if (refModal) {
      refModal.addEventListener('click', (e) => {
        if (e.target.id === 'ref-prompt-modal') {
          closeRefModal();
        }
      });
    }

    const copyActiveRefBtn = document.getElementById('btn-copy-active-ref');
    if (copyActiveRefBtn) {
      copyActiveRefBtn.addEventListener('click', copyActiveRefPrompt);
    }

    // 설정 탭 - 항목 추가 버튼 및 엔터키
    const btnAddStatus = document.getElementById('btn-add-status');
    const inputNewStatus = document.getElementById('new-status-input');
    if (btnAddStatus && inputNewStatus) {
      btnAddStatus.addEventListener('click', () => addConfigItem('status', 'new-status-input'));
      inputNewStatus.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addConfigItem('status', 'new-status-input');
      });
    }

    document.getElementById('btn-add-channel').addEventListener('click', () => addConfigItem('channel', 'new-channel-input'));
    document.getElementById('new-channel-input').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') addConfigItem('channel', 'new-channel-input');
    });

    document.getElementById('btn-add-format').addEventListener('click', () => addConfigItem('format', 'new-format-input'));
    document.getElementById('new-format-input').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') addConfigItem('format', 'new-format-input');
    });

    document.getElementById('btn-add-category').addEventListener('click', () => addConfigItem('category', 'new-category-input'));
    document.getElementById('new-category-input').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') addConfigItem('category', 'new-category-input');
    });

    // 설정 탭 - 새 컬럼 추가 버튼 및 엔터키
    const btnCreateCustomCol = document.getElementById('btn-create-custom-col');
    const inputNewColName = document.getElementById('new-column-name-input');
    if (btnCreateCustomCol && inputNewColName) {
      btnCreateCustomCol.addEventListener('click', () => {
        createCustomColumn(inputNewColName.value);
        inputNewColName.value = '';
      });
      inputNewColName.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          createCustomColumn(inputNewColName.value);
          inputNewColName.value = '';
        }
      });
    }

    // Firebase 클라우드 관리 이벤트
    const btnSyncToCloud = document.getElementById('btn-sync-to-cloud');
    if (btnSyncToCloud) {
      btnSyncToCloud.addEventListener('click', () => uploadAllLocalToFirestore(false));
    }

    const btnReloadCloud = document.getElementById('btn-reload-cloud');
    if (btnReloadCloud) {
      btnReloadCloud.addEventListener('click', reloadFromFirestore);
    }

    const btnShowRulesInfo = document.getElementById('btn-show-rules-info');
    if (btnShowRulesInfo) {
      btnShowRulesInfo.addEventListener('click', openRulesModal);
    }

    const btnCloseRulesModal = document.getElementById('btn-close-rules-modal');
    if (btnCloseRulesModal) {
      btnCloseRulesModal.addEventListener('click', closeRulesModal);
    }

    const btnCloseRulesBottom = document.getElementById('btn-close-rules-bottom');
    if (btnCloseRulesBottom) {
      btnCloseRulesBottom.addEventListener('click', closeRulesModal);
    }

    const rulesModal = document.getElementById('firebase-rules-modal');
    if (rulesModal) {
      rulesModal.addEventListener('click', (e) => {
        if (e.target.id === 'firebase-rules-modal') {
          closeRulesModal();
        }
      });
    }

    const btnCopyRulesCode = document.getElementById('btn-copy-rules-code');
    if (btnCopyRulesCode) {
      btnCopyRulesCode.addEventListener('click', () => {
        const rulesCode = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}`;
        copyToClipboard(rulesCode, '보안 규칙 코드가 복사되었습니다!');
      });
    }

    // 백업 & 복원
    document.getElementById('btn-export-json').addEventListener('click', exportDataAsJson);
    document.getElementById('btn-quick-export').addEventListener('click', exportDataAsJson);

    document.getElementById('file-import-json').addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        importDataFromJson(e.target.files[0]);
        e.target.value = '';
      }
    });

    // ESC 키로 모달 닫기
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const deleteModal = document.getElementById('delete-confirm-modal');
        const refModal = document.getElementById('ref-prompt-modal');
        const fbRulesModal = document.getElementById('firebase-rules-modal');

        if (fbRulesModal && !fbRulesModal.classList.contains('hidden')) {
          closeRulesModal();
        } else if (!deleteModal.classList.contains('hidden')) {
          closeDeleteModal();
        } else if (!refModal.classList.contains('hidden')) {
          closeRefModal();
        } else if (appState.activeModalId) {
          closeDetailModal();
        }
      }
    });
  }

  // ==========================================
  // 17. 앱 초기 실행 시작점 (App Init)
  // ==========================================
  function initApp() {
    loadFromStorage();
    renderTableHeader();
    populateSelectOptions();
    renderFormCustomColumns();
    renderRefPromptTabs();
    setupEventListeners();
    updateStorageInfo();
    renderContentList();

    // Firebase Firestore 클라우드 초기화 및 실시간 동기화 시작
    initFirebase();
  }

  document.addEventListener('DOMContentLoaded', initApp);
})();
