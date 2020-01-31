<template>

    <form id="form" class="form"></form>

</template>

<script>
export default {

    name: 'PhotoFieldLoad',

    data(){
        return{
            photos: [],
        }
    },
    computed:{

    },

    methods: {

        formIMGinput(){
        
            var
            upload = document.getElementById('form');

            function uitem( f ) {

                f._max = f._max || 0;

                var
                itm = document.createElement('label');

                itm._add = itm.appendChild( document.createElement('span') );
                itm._add.appendChild( document.createTextNode('+') );

                itm._input = itm.appendChild( document.createElement('input') );
                itm._input.accept ='image/*';
                itm._input.type = 'file';

                itm._input.onchange = function() {

                    f._max++;

                    itm._remove = itm.appendChild( document.createElement('a') );
                    itm._remove.appendChild( document.createTextNode('×') );
                    itm._remove.href = '#';

	                for( var arr = [], i = 0; i < upload.elements.length; i++ ){

		                if('file' == upload.elements[ i ].type && upload.elements[ i ].files[ 0 ] ) {

			            arr.push( upload.elements[ i ].files[ 0 ] );
			            console.log( )
		                }	
	                }

                    itm._remove.onclick = function() {

                        f._max--;

                        f.removeChild( itm );

                        if( 4 == f._max ) {

                            uitem( upload );
                        }

                        return false;
                    };


                    itm._img = itm.appendChild( document.createElement('span') )
                            .appendChild( document.createElement('img') );

                    itm._img.alt = '';
                    itm._img.src = URL.createObjectURL( itm._input.files[ 0 ] ); /*  'Untitled-1.gif'; */


                    itm.removeChild( itm._add );
                    itm.appendChild( itm._input );

                    itm._input.disabled = true;

                    if( f._max < 5 ) {

                        uitem( upload );
                    }
                }

                return f.appendChild( itm );
            }

            uitem( upload );
        }
         
    },
    mounted() {

        // alert( 'created' );
        {{this.formIMGinput()}};
    }
}

</script>


<style scoped>

	.form			{}
	.form label,
	.form span		{width:100px; height:100px;}
	.form label		{display:inline-block; border:1px #777 solid; overflow:hidden; margin:4px; position:relative;}
	.form input		{visibility:hidden;}
	.form span		{display:table-cell; text-align:center; vertical-align:middle; font-weight:bold; font-size:50px;}

	.form label		{transition:background ease-out 0.2s;}
	.form label:hover	{background:#ffa;}

	.form a			{position:absolute; display:block; top:4px; right:4px; width:16px; height:16px; background:#f00; border-radius:50%; line-height:16px; text-decoration:none; color:#fff; text-align:center;}

	.form img		{max-width:96%; max-heigth:96%;}


	/* .form .btn		{visibility:visible;} */



</style>

