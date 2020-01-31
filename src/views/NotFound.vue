
<template>
    <div class="settingsWrapper center">
        <div class="center">
            <h3>
                {{title}}
            </h3>
            <div>
                {{error}}
            </div>
        </div> 
    </div>
</template>

<script>
export default {
    name:"UserSettings",
    data(){
        return{
            title: "The page you are looking for can`t be found",
            error: "404",
        }
    }
}
</script>

<style>
    .center {
        text-align: center;      
        margin-top: 15%
        
        
    }

    h3+div {
        margin-top: 20px;
        font-size: 140px;
    }
</style>