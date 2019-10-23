let webstore = new Vue({
    el:'#app',
    data:{
        showProduct:true,
        sitename: `Mrs. Anna's cakes`,
        product: [

        ],
   
        
        order:{
           firstName:'',
           lastName:'',
           address:'',
           city:'',
           country:'',
           zip:'',
           method: 'Home Address',
           home:'Home Address',
           business:'Business Address',
           gift: 'Send As a Gift',
           sendGift:'Send As a Gift',
           dontSendGift:'Do Not Send As a Gift',
         
        },
        countries:{
            RU: 'Russia',
            USA:'USA',
            CH:'China',
            FR:'France',

        },
      
        cart:[


        ],

    },
    filters: {
        formatPrice: function(price){
            if(!parseInt(price))
            {return "";}
            if(price>99999){
                let priceString = (price/100).toFixed(2);
                let priceArray = priceString.split("").reverse();
                let index = 3;
                while(priceArray.length>index+3){
                    priceArray.splice(index+3,0,",");
                    index+=4;
                }
                return "$" + priceArray.reverse().join("");
            }else{
                return "$" + (price/100).toFixed(2);
            }
        }
    },
    created: function(){
        axios.get('products.json')
        .then((response)=>{
            this.products=response.data.products;
            console.log(this.products);
        });
    },
  
    methods: {
        addToCart: function(aProduct){
            this.cart.push(aProduct.id);
        },
        showCheckout(){
            this.showProduct=this.showProduct ? false:true;
        },
        submitForm(){
            alert('Submitted');
        },
        checkRating(n, MyProduct){
            return MyProduct.rating - n >= 0;
        },
        canAddToCart(aProduct){
            return aProduct.availableInventory>this.cartCount(aProduct.id);
        },
        cartCount(id){
            let count = 0;
            for(let i=0;i<this.cart.length;i++){
                if(this.cart[i] === id ){
                    count++;
                }
            }
            return count;
        },
        sortPro() {
            if(this.products.length > 0){
                let productsArray = this.products.slice(0);
                function compare(a,b){
                    if(a.title.toLowerCase() < b.title.toLowerCase())
                    return -1;
                    if(a.title.toLowerCase() > b.title.toLowerCase())
                    return 1;
                    return 0;
                }
                return productsArray.sort(compare);
            }
    
        },
       
    },
    computed: {
        cartItemCount: function(){
            return this.cart.length || '';
        },
    
    },


});