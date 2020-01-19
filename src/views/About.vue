<template>
  <div class="about">
    <nav-component  class="dark"/>

    <div class="content">
        С помощью “Auto Aid Adviser”вы можете
      </div>
      <div class="container">
        <div class="photo-start">
          <img :src="require('@/assets/Group.jpg')" >
          <p class="r">Найти ближайшие к вам СТО, мойки и шиномонтажи с полным и актуальным описанием услуг </p>
        </div>
        <div class="photto">
          <img :src="require('@/assets/Group_1.jpg')">
          <p class="t"> Оформить онлайн-запись на любую услугу в любое удобное для вас время </p>
        </div>
          
        <div class="phottto">
          <img :src="require('@/assets/Group_2.jpg')" >
          <p class="w">Зарегистрироваться и получать БОНУСЫ за пользование сайтом от 
          компаний-партнеров</p>
        </div>
      <div class="cont">
        <div class="clon">
        <img :src="require('@/assets/Group_4.jpg')" >
          <p class="u">Иметь свой календарь записей и получать напоминания о предстоящих визитах</p>
        </div>
        <div class="map">
          <img :src="require('@/assets/Group.jpg')" >
          <p class="q">Найти ближайшие к вам СТО, мойки и шиномонтажи с полным и актуальным описанием услуг</p>
        </div>
      </div>	
        <div class="content_1">
        Для владельцев бизнеса!
      </div>
      <div class="block">
        <p>У вас свой бизнес, связанный с автомобилями? Зарегистрируйте свое предприятие и ведите свой бизнес ОНЛАЙН.</p>
        <p> Ведите запись всех ваших клиентов на любые услуги в онлайн режиме. Теперь вы можете управлять временем и графиком своей работы, а вашим сотрудникам будет намного проще контролировать поток обращений.</p>
        <p>Информация о Вашем объекте с полным его описанием, услугами и режимом работы автоматически попадает в сеть Auto Aid Adviser, а у вас появляется возможность ежемесячно получать новых клиентов</p>
      </div>
      <div class="togl">
        <img :src="require('@/assets/Group_1.jpg')" >
      </div>
      <button class="but">Зареєструвати бізнес</button>
      </div>

      <!-- <footer>
          <div class="Evo">
              <img :src="require('@/assets/Group 194.png')">
              <p class="footerTitle">2019 Hillel EVO project. Auto Aid Adviser</p>
          </div>
      </footer> -->

  </div>
</template>

<script>
import NavComponent from '../components/NavComponent';
export default {
    name: 'About',
    components: {
        NavComponent,
    },
}
</script>

<style scoped>
	* {
		margin: 0px;
		padding: 0px;
	}
	.content {
		position: relative;
		height: 28px;
		left: 451px;
		top: 144px;
		font-family: Roboto;
		font-style: normal;
		font-weight: 500;
		font-size: 24px;
		line-height: 28px;
		display: flex;
		align-items: center;
		color: #4B5E7A;
	}
	.container {
		position: relative;
		width: 1100px;
		height: 286px;
		left: 133px;
		top: 237px;
    text-align:left;
	}
	.photo-start {
		width: 260px;
		height: 179px;
		
	}
	.r {
		position: relative;
		width: 260px;
		height: 66px;
		top: 50px;
		font-family: Roboto;
		font-style: normal;
		font-weight: normal;
		font-size: 16px;
		line-height: 22px;
		display: flex;
		align-items: center;
		color: #4B5E7A;
	}
	
	.photto {
		position: relative;
		width: 260px;
		height: 179px;
		left: 400px;
		top: -180px;
	}
	.t {
		position: relative;
		width: 260px;
		height: 66px;
		top: 50px;
		font-family: Roboto;
		font-style: normal;
		font-weight: normal;
		font-size: 16px;
		line-height: 22px;
		display: flex;
		align-items: center;
		color: #4B5E7A;
	}
	.phottto {
		position: relative;
		width: 260px;
		height: 179px;
		left: 800px;
		top: -350px;
	}
	.w {
		position: relative;
		width: 260px;
		height: 66px;
		top: 50px;
		font-family: Roboto;
		font-style: normal;
		font-weight: normal;
		font-size: 16px;
		line-height: 22px;
		display: flex;
		align-items: center;
		color: #4B5E7A;
	}
	.cont {
		position: relative;
		width: 800px;
		height: 286px;
		left: 200px;
		top: -150px;

	}
	.clon {
		position: relative;
		width: 260px;
		height: 179px;
	}
	.u {
		position: relative;
		width: 260px;
		height: 66px;
		top: 50px;
		font-family: Roboto;
		font-style: normal;
		font-weight: normal;
		font-size: 16px;
		line-height: 22px;
		display: flex;
		align-items: center;
		color: #4B5E7A;
	}
	.map {
		position: relative;
		width: 260px;
		height: 179px;
		left: 450px;
		top: -178px;

	}
	.q {
		position: relative;
		width: 260px;
		height: 66px;
		top: 50px;
		font-family: Roboto;
		font-style: normal;
		font-weight: normal;
		font-size: 16px;
		line-height: 22px;
		display: flex;
		align-items: center;
		color: #4B5E7A;
	}
	.content_1 {
		position: relative;
		width: 292px;
		height: 28px;
		left: 400px;
		top: 7px;
		font-family: Roboto;
		font-style: normal;
		font-weight: 500;
		font-size: 24px;
		line-height: 28px;
		display: flex;
		align-items: center;
		color: #4B5E7A;
	}
	.block {
		position: relative;
		width: 600px;
		height: 240px;
		left: 120px;
		top: 64px;
		font-family: Roboto;
		font-style: normal;
		font-weight: 500;
		font-size: 16px;
		line-height: 24px;
		color: #6F7E95;
	}
	.togl {
		position: relative;
		width: 260px;
		height: 179px;
		left: 800px;
		top: -170px;
	}
	.but {
		position: relative;
		width: 280px;
		height: 56px;
		left: 120px;
		top: -50px;
		background: #0E1E2E;
		border-radius: 4px;
		font-family: Roboto;
		font-style: normal;
		font-weight: normal;
		font-size: 16px;
		line-height: 18px;
		text-align: center;
		text-transform: uppercase;
		color: #FFFFFF;
	}
    /*  footer  */
    footer {
        width: 100%;
        padding: 29px 50px;
        text-align: right;
        background-color: #0E1E2E;
    }
    .footerTitle {
        font-size: 16px;
        line-height: 22px;
        color: #FFFFFF;
    }
</style>