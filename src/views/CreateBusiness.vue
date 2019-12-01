<template>
    <div>
        <h1>Регистрация объекта</h1>
        <h2>ds,thbnt eckeub</h2>
            <ul> 
                <h3> first</h3> 
                <div v-for="servise in servises" :key="servise">
                    <li>
                        <input type="checkbox" :value="servise"  v-model="bis">
                        <label>{{servise.serv}}</label>
                    </li>
                </div>          
            </ul>
            <hr />
            <ul v-for="b in bis" :key="b">
                <li>{{b.serv}} {{b.status}}</li>
                
            </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            servises : [ 
                {serv:'Замена масла',
                id: 1}, 
                {serv:'Пк диагностика',
                id: 2}, 
                {serv:'Замена масла',
                id: 3}, 
                ],
            bis: []
        
        }
    },
    methods: {

        
        
    },

}
</script>
<style>

</style>