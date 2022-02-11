<template>
  <v-container fluid>
    <v-row no-gutters v-if="productDetail">
      <v-col cols="12" lg="5" xl="4">
        <div class="sticky_div">
          <ProductDetailImageZoomer v-on:change-zoomer-image="changeZoomerImage"
                                    :thumb_image="thumbImage" :large_image="largeImage"
                                    :smaller_image="smallerImage"></ProductDetailImageZoomer>
        </div>
      </v-col>
      <v-col cols="12" lg="5" xl="6">
        <ProductDescription
          :product_detail="productDetail"
          :variant_price="variantPrice"
          :selected_variant="selectedVariantSlug"
          :associated_variants="selectedAssociationVariants"
          :variant_stock="variantStock"
          :loading_variant_icon="loadVariantIcons"
          :loading="loadButton"
          v-on:change-image-and-price-according-to-variant="makeCombinationForVariantValues"
        ></ProductDescription>
        <v-card color="#f1f1f1" width="97%" tile
                class="py-2 px-2 ml-4 mb-5">
          <div class="ml-4 mt-1" v-if="productDetail.order_qty_limits">
            <v-row no-gutters>
              <v-col cols="6" xl="4" lg="3">
                <div class="caption font-weight-medium">Max. Quantity:
                  {{ productDetail.order_qty_limits.max_order_quantity }}
                </div>
              </v-col>
              <v-col cols="6" xl="4" lg="4">
                <div class="caption font-weight-medium">Min. Quantity:
                  {{ productDetail.order_qty_limits.min_order_quantity }}
                </div>
              </v-col>
            </v-row>
          </div>
          <div class="ml-4 mt-2" v-if="variantQuantityLimits">
            <v-row no-gutters>
              <v-col cols="6" xl="4" lg="4">
                <div class="subtitle-2 font-weight-bold">Max. Quantity:
                  {{ variantQuantityLimits.max_order_quantity }}
                </div>
              </v-col>
              <v-col cols="6" xl="4" lg="4">
                <div class="subtitle-2 font-weight-bold">Min. Quantity:
                  {{ variantQuantityLimits.min_order_quantity }}
                </div>
              </v-col>
            </v-row>
          </div>
          <div class="ml-0 mt-1">
            <div class="variant_name mb-4 ml-4">Quantity:
              <span class="selected_variant">{{ quantityForVariant }}</span>
            </div>
            <v-form class="mt-1" ref="addToCart">
              <v-row
                class="ml-4 mt-3" no-gutters>
                <v-col cols="12" xl="12" lg="12">
                  <div class="variant_name mb-3">Package Type:
                    <span class="subtitle-2 font-weight-bold black--text">{{ selectedProductPackageName }} <span
                      v-if="selectedProductPackageDescription!==''"
                      class="font-weight-regular ml-2">[ {{ selectedProductPackageDescription }} ]</span></span>
                  </div>
                  <v-row no-gutters>
                    <v-col cols="12" xl="7" lg="7">
                      <v-btn v-for="(packageType,index) in productPackagingDetail" :key="index"
                             tile
                             dark
                             x-small
                             outlined
                             depressed
                             height="30"
                             class="mr-2 mt-3 mb-3"
                             :ripple="false"
                             @click="showProductPriceAccordingToTheSelectedPackagingType(packageType)"
                             :color="packageType['color']">
                        <span :class="packageType['color']==='#FF5C00'?'variant_button':'unselected_variant_button'">{{
                            packageType['package_name']
                          }}</span>
                      </v-btn>
                    </v-col>
                    <v-col cols="12" xl="5" lg="5" v-if="stockInCart!==null">
                      <div class="dark_blue_text subtitle-2 text-left font-weight-medium mt-5">{{ stockInCart }}
                        {{ selectedProductPackageName }}
                        in your cart.
                      </div>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-row class="ml-4" no-gutters>
                <v-col cols="2">
                  <v-text-field
                    solo
                    dense
                    height="30"
                    label="Solo"
                    type="number"
                    class="simple_text_field"
                    placeholder="Quantity"
                    :disabled="disablePriceButton"
                    v-model="quantityForVariant"
                    :rules="quantityRule">
                  </v-text-field>
                </v-col>
                <v-col cols="8" sm="8">
                  <v-btn
                    tile
                    depressed
                    color="darkBlue"
                    dense
                    small
                    class="ml-3"
                    outlined
                    :dark="!disableShoppingCartButton"
                    :disabled="disableShoppingCartButton"
                    @click="addToCart(quantityForVariant)"
                  >
                      <span v-if="showLoadingInformation" class="caption dark_blue_text font-weight-medium ml-2">
                    <v-progress-circular class="ml-2" width="2" indeterminate color="primary"
                                         size="20"></v-progress-circular>
                    Adding to cart...
                  </span>
                    <span v-else>
                       <v-icon size="14" class="mr-1">mdi-cart</v-icon>
                    Add to cart
                    </span>
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </div>
        </v-card>
        <ProductSpecification :product_detail="productDetail"></ProductSpecification>
      </v-col>
      <v-col cols="12" lg="2" xl="2">
        <RelatedProducts v-on:related-products="relatedProductCount"></RelatedProducts>
        <div v-if="relatedProductLength>3" class="text-center">
          <v-btn :ripple="false" text v-scroll-to="{ el: '#related_product', duration: 2000 }">
            <v-icon dark color="primary" small>mdi-chevron-double-left</v-icon>
            <div class="caption font-weight-bold product_name_hover blue--text">View More</div>
            <v-icon dark color="primary" small>mdi-chevron-double-right</v-icon>
          </v-btn>
        </div>
      </v-col>
      <v-col class="pl-4 pl-xl-13 pl-lg-13 pr-3 pt-4 product_description" cols="12">
        <ProductInformation :product_detail="productDetail"></ProductInformation>
      </v-col>
      <v-col id="related_product" class="pl-13 pr-3 pt-4" cols="12">
        <v-row no-gutters>
          <v-col class="pr-4" v-for="(product,index) in relatedProducts" :key="index" cols="2">
            <v-card :to="{ name:'ProductDetail',params:{slug:product.slug}}" elevation="2">
              <img height="120" :src="product['featured_image']">
              <div class="related_product_name ml-2">{{ product.product_name }}</div>
              <v-rating class="rating_design ml-1" small v-model="rating" color="yellow darken-3"
                        background-color="yellow darken-4"></v-rating>
              <div class="caption font-weight-bold ml-2 price_color">{{ product.price }}</div>
              <div class="related_product_category ml-2">Brand: {{ product.brand }}</div>
              <div class="related_product_category ml-2">Category: {{ product.category }}</div>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ProductService from "@/services/shared/product";

export default {

  name: "ProductDetail",

  components: {

    RelatedProducts: () => import("@/components/shared/product-page/RelatedProducts"),

    ProductInformation: () => import("@/components/shared/product-page/ProductInformation"),

    ProductSpecification: () => import("@/components/shared/product-page/ProductSpecification"),

    ProductDescription: () => import("@/components/shared/product-page/ProductDescription"),

    ProductDetailImageZoomer: () => import("@/components/shared/product-page/ProductDetailImageZoomer")

  },

  data() {

    return {

      productDetail: null,
      zoomerSmallImages: [],
      thumbImage: '',
      largeImage: '',
      thumbImages: [],
      largeImages: [],
      disablePriceButton: false,
      disableShoppingCartButton: false,
      variantStockAvailable: null,
      productOrVariantPackageType: [],
      loading: false,
      price: null,
      selectedVariantSlug: [],
      selectedVariantsOtherAssociatedVariants: [],
      stockAvailableInCart: null,
      allSelectedVariant: [],
      selectedProductPackageName: '',
      selectedProductPackageDescription: '',
      selectedProductPackage: null,
      variantsForTheProducts: [],
      selectedVariantCodeName: '',
      totalVariant: [],
      loadVariantIcons: false,
      variantQuantityLimit: null,
      quantityForVariant: 1,
      quantityRule: [
        v => v > 0 || "Must be more than 0.",
        v => /^[0-9]*$/.test(v) || 'Must be integer'
      ],
      selectedPackageTotalStock: null,
      relatedProductLength: 0,
      showLoadingInformation: false,
      loadButton: false,
      success: false,
      relatedProducts: [],
      rating: 3,
    }

  },

  head() {

    return {

      title: 'product detail ho hai',
      meta: [
        {
          property: 'og:title',
          content: 'product detail ho',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'this is description',
        },
      ]


    }

  },

  async asyncData({params}) {

    try {

      let response = await ProductService.getProductDetail(params.slug)

      return {

        productDetail: response.data,

        variantStockAvailable: response.data['warehouse_product_stock'],

        productOrVariantPackageType: response.data['product_packaging_types'],

        zoomerSmallImages: response.data['product_images'],

        thumbImages: response.data['product_images'],

        largeImages: response.data['product_images'],

        thumbImage: response.data['product_images'][0],

        largeImage: response.data['product_images'][0],

        disablePriceButton: response.data['product_variant_info'].length === 0,

        disableShoppingCartButton: response.data['product_variant_info'].length === 0,

        price: null,

        variantQuantityLimit: null,

        selectedVariantSlug: [],

        selectedVariantsOtherAssociatedVariants: [],

      }

    } catch (e) {

      console.log('error');

    }

  },

  computed: {

    variantQuantityLimits() {

      return this.variantQuantityLimit;

    },

    productPackagingDetail() {

      return this.productOrVariantPackageType;

    },

    smallerImage() {

      return this.zoomerSmallImages;

    },

    variantPrice() {

      return this.price;

    },

    selectedAssociationVariants() {

      return this.selectedVariantsOtherAssociatedVariants;

    },

    variantStock() {

      return this.variantStockAvailable;

    },

    stockInCart() {

      return this.stockAvailableInCart;

    },

  },

  methods: {

    relatedProductCount(products) {

      this.relatedProductLength = products.length;

      this.relatedProducts = [...products];

      // for (let i = 0; i < 3; i++) {
      //
      //   this.relatedProducts.splice(0, 1);
      //
      // }

    },

    changeZoomerImage(index) {

      this.thumbImage = this.zoomerSmallImages[index];

      this.largeImage = this.zoomerSmallImages[index];

    },

    showProductPriceAccordingToTheSelectedPackagingType(selectedPackage) {

      this.selectedProductPackage = selectedPackage['package_code'];

      this.selectedProductPackageName = '';

      this.selectedProductPackageDescription = '';

      this.selectedProductPackageDescription = selectedPackage['description'];

      this.selectedProductPackageName = selectedPackage['package_name'];

      this.selectedPackageTotalStock = selectedPackage['stock'];

      this.variantStockAvailable = selectedPackage['display_stock'];

      this.stockAvailableInCart = selectedPackage['stock_in_cart'];

      if (!this.variantStockAvailable) {

        this.disableShoppingCartButton = true;

        this.disablePriceButton = true;

      } else {

        this.disableShoppingCartButton = false;

        this.disablePriceButton = false;

      }

      this.productOrVariantPackageType.map(data => {

        if (selectedPackage['package_code'] === data['package_code']) {

          data['color'] = '#FF5C00';

        } else {

          data['color'] = '#c3c3c3';

        }

      });

      this.price = selectedPackage.price;

    },

    makeCombinationForVariantValues(selectedVariant) {

      this.stockAvailableInCart = null;

      if (selectedVariant['variant_depth'] !== this.productDetail['product_variant_info'].length) {

        if (selectedVariant['variant_depth'] === 1) {

          this.selectedVariantsOtherAssociatedVariants = [];

          this.allSelectedVariant = [];

        } else {

          this.selectedVariantsOtherAssociatedVariants.splice(selectedVariant['variant_depth'] - 1, this.selectedVariantsOtherAssociatedVariants.length - selectedVariant['variant_depth'] + 1);

        }

        this.productOrVariantPackageType = [];

        this.selectedProductPackageName = '';

        this.selectedProductPackageDescription = '';

      }

      this.selectedProductPackage = null;

      this.selectedProductPackageName = '';

      this.selectedProductPackageDescription = '';

      let variant = this.productDetail['product_variant_info'];

      this.variantsForTheProducts = variant;

      this.checkIfSelectedVariantLengthIsLesserThanTheTotalVariantLevel(selectedVariant, variant);

    },

    checkIfSelectedVariantLengthIsLesserThanTheTotalVariantLevel(selectedVariant, variant) {

      let checkForDuplicateEntry = false;

      let checkForSameIndexVariant = false;

      if (this.allSelectedVariant.length < variant.length) {

        checkForDuplicateEntry = this.allSelectedVariant.some(data => data.variant_code === selectedVariant.variant_value_code);

        checkForSameIndexVariant = this.allSelectedVariant.some(data => data.parent_code === selectedVariant.variant_code);

        this.checkingForDuplicateVariant(checkForDuplicateEntry, checkForSameIndexVariant, variant, selectedVariant);

      }

      if (!checkForDuplicateEntry && !checkForSameIndexVariant) {

        this.createSlugToMakeTheCombination();

        if (this.productDetail['product_variant_info'].length === this.allSelectedVariant.length) {

          this.changeTheLoopAsWellAsAllSelectedVariants(selectedVariant);

          this.disablePriceButton = false;

          this.disableShoppingCartButton = false;

          if (this.productDetail['product_variant_info'].length === this.allSelectedVariant.length) {

            this.getTheApiForTheVariantSelectedToFetchThePriceAndImages();

          }

        } else {

          this.getTheLowerLevelVariantsFromTheApi(selectedVariant);

        }

      } else if (!checkForDuplicateEntry && checkForSameIndexVariant) {

        this.createSlugToMakeTheCombination();

        this.getTheLowerLevelVariantsFromTheApi(selectedVariant);

      }

    },

    checkingForDuplicateVariant(checkForDuplicateEntry, checkForSameIndexVariant, variant, selectedVariant) {

      if (!checkForDuplicateEntry && !checkForSameIndexVariant) {

        this.allSelectedVariant.push({

          'name': selectedVariant.variant_value_name,

          'variant_code': selectedVariant.variant_value_code,

          'parent_code': selectedVariant.variant_code,

          'slug': selectedVariant.variant_value_slug,

          'parent_name': selectedVariant.slug,

        });

        if (this.allSelectedVariant.length === 1) {

          this.selectedVariantsOtherAssociatedVariants = [];

          this.productOrVariantPackageType = [];

          this.selectedProductPackageName = '';

          this.selectedProductPackageDescription = '';

          this.ifTheVariantSelectedLengthIsOne(selectedVariant);

        } else {

          this.addTheColorToTheSelectedVariant(selectedVariant);

        }

      } else if (checkForDuplicateEntry && checkForSameIndexVariant) {

        console.log();

      } else {

        let selectedIndex = this.allSelectedVariant.findIndex(data => data.parent_code === selectedVariant.variant_code);

        this.checkingIfSameParent = selectedIndex;

        let selectedObject = {

          'name': selectedVariant.variant_value_name,

          'variant_code': selectedVariant.variant_value_code,

          'parent_code': selectedVariant.variant_code,

          'slug': selectedVariant.variant_value_slug,

          'variant_depth': selectedVariant.variant_depth,

          'parent_name': selectedVariant.slug
        }

        this.allSelectedVariant.splice(selectedIndex, 1, selectedObject);

        this.allSelectedVariant.map(data => {

          if (selectedVariant.variant_depth === 1) {

            this.changeColorForTheFirstVariants(data);

          } else {

            this.selectedVariantsOtherAssociatedVariants.map(variant => {

              variant.map(data => {

                if (data['variant_value_slug'] === selectedVariant.variant_value_slug) {

                  data.color = '#FF5C00';

                } else {

                  data.color = '#c3c3c3';

                }

              })

            })

          }

        });

      }

    },

    ifTheVariantSelectedLengthIsOne(selectedVariant) {

      this.productDetail['first_variant'].map(variantInfo => {

        if (variantInfo.variant_value_slug === selectedVariant.variant_value_slug) {

          variantInfo.color = '#FF5C00';

        } else {

          variantInfo.color = '#c3c3c3';

        }

      });

    },

    addTheColorToTheSelectedVariant(selectedVariant) {

      this.selectedVariantsOtherAssociatedVariants.map((variant, index) => {

        if (this.selectedVariantsOtherAssociatedVariants[index][0]['variant_depth'] === selectedVariant['variant_depth']) {

          variant.map(data => {

            if (data['variant_value_slug'] === selectedVariant.variant_value_slug) {

              data.color = '#FF5C00';

            } else {

              data.color = '#c3c3c3';

            }

          })

        }

      });

    },

    changeColorForTheFirstVariants(selected) {

      this.productDetail['first_variant'].map(variantInfo => {

        if (variantInfo.variant_value_slug === selected.slug) {

          variantInfo.color = '#FF5C00';

        } else {

          variantInfo.color = '#c3c3c3';

        }

      })

    },

    createSlugToMakeTheCombination() {

      this.allSelectedVariant.map(variant_value => {

        this.variantsForTheProducts.map((selected, index) => {

          if (variant_value['parent_code'] === selected['variant_code']) {

            variant_value['parent_index'] = index;

          }

        })

      });

      this.allSelectedVariant.sort(function (a, b) {

        return a.parent_index - b.parent_index

      });

      let selectedVariantSlug = [];

      let selectedVariantCodSlug = [];

      this.allSelectedVariant.map(data => {

        selectedVariantSlug.push(data.slug);

        selectedVariantCodSlug.push(data.variant_code);

      });

      this.selectedVariantSlug = selectedVariantSlug;

      this.selectedVariantSlugName = selectedVariantSlug.join("-");

      this.selectedVariantCodeName = selectedVariantCodSlug.join("-");

    },

    changeTheLoopAsWellAsAllSelectedVariants(selectedVariant) {

      if (selectedVariant.variant_depth === 1) {

        this.allSelectedVariant = [];

        this.allSelectedVariant.push({

          'name': selectedVariant.variant_value_name,

          'variant_code': selectedVariant.variant_value_code,

          'parent_code': selectedVariant.variant_code,

          'slug': selectedVariant.variant_value_slug,

          'parent_name': selectedVariant.slug,

        });

        this.selectedVariantsOtherAssociatedVariants = [];

        this.allSelectedVariant.map(data => {

          if (selectedVariant.variant_depth === 1) {

            this.changeColorForTheFirstVariants(data);

          }

        });

        this.ifTheVariantSelectedLengthIsOne(selectedVariant);

        this.createSlugToMakeTheCombination();

        this.getTheLowerLevelVariantsFromTheApi(selectedVariant);


      } else {

        this.allSelectedVariant.splice(selectedVariant.variant_depth - 1, this.allSelectedVariant.length - 1);

        this.allSelectedVariant.push({

          'name': selectedVariant.variant_value_name,

          'variant_code': selectedVariant.variant_value_code,

          'parent_code': selectedVariant.variant_code,

          'slug': selectedVariant.variant_value_slug,

          'parent_name': selectedVariant.slug,

        });

        this.selectedVariantsOtherAssociatedVariants.splice(selectedVariant.variant_depth - 1, this.allSelectedVariant.length - 1);

        this.createSlugToMakeTheCombination();

        this.getTheLowerLevelVariantsFromTheApi(selectedVariant);

        this.addTheColorToTheSelectedVariant(selectedVariant);

      }

    },

    getTheApiForTheVariantSelectedToFetchThePriceAndImages() {

      let selectedVariantCodeSlugName = this.productDetail['product_variants'].find(data => data['variant_value_code_combination'] === this.selectedVariantCodeName);

      this.$store.dispatch('product/getNormalOrderVariantInfoForPackagingDetail', {

        product_slug: this.$route.params.slug,

        variant_name: selectedVariantCodeSlugName.product_variant_code,

      })

        .then(response => {

          this.totalVariant = this.allSelectedVariant;

          this.price = response.data.rate;

          this.productOrVariantPackageType = response.data['product_packaging_types'];

          this.variantStockAvailable = response.data.stock;

          if (response.data.images.length > 0) {

            let images = response.data.images;

            let zoomImage = [];

            images.map(data => {

              zoomImage.push({

                'image': data

              })

            });

            this.zoomerSmallImages = zoomImage;

            this.thumbImages = zoomImage;

            this.largeImages = zoomImage;

            this.thumbImage = zoomImage[0];

            this.largeImage = zoomImage[0];

            this.changeZoomerImage(0);

          }

        })

        .catch(() => {

          this.$store.commit('notification/COMMIT_SNACKBAR', {

            message: this.$store.getters['login/ERRORS']['message'],

            color: 'error'

          })

        });

    },

    getTheLowerLevelVariantsFromTheApi(selectedVariant) {

      this.loadVariantIcons = true;

      let payload = {

        product_code: this.productDetail['product_code'],

        variant_value_code: selectedVariant.variant_value_code,

        variant_depth: selectedVariant.variant_depth,

        ancestor_code: selectedVariant.ancestor_code

      }

      this.$store.dispatch('product/getNextLevelNormalOrderVariantInfo', payload).then(response => {

        let checkIfTheVariantIsFromTheSameParent = this.allSelectedVariant.some(data => data['variant_depth'] === selectedVariant['variant_depth']);

        if (!checkIfTheVariantIsFromTheSameParent) {

          if (response.length > 0) {

            if (this.selectedVariantsOtherAssociatedVariants.length > 0) {

              if (response[0]['variant_depth'] === this.selectedVariantsOtherAssociatedVariants[0][0]['variant_depth']) {

                console.log();

              } else {

                this.selectedVariantsOtherAssociatedVariants.push(response);

              }

            } else {

              this.selectedVariantsOtherAssociatedVariants.push(response);

            }

          }

        } else {

          this.selectedVariantsOtherAssociatedVariants.splice(this.checkingIfSameParent, 1, response);

        }

        this.loadVariantIcons = false;

      });

      this.disablePriceButton = true;

      this.disableShoppingCartButton = true;

    },

    addToCart(quantity) {

      if (this.selectedProductPackageName === '') {

        this.$store.commit('notification/COMMIT_SNACKBAR', {

          message: 'Please Select Package Type.',

          color: 'error'

        })

        this.showLoadingInformation = false;

        this.disableShoppingCartButton = false;


      } else if (parseInt(this.priceForVariant) > this.selectedPackageTotalStock) {

        this.$store.commit('notification/COMMIT_SNACKBAR', {

          message: 'Quantity is greater than available stock',

          color: 'error'

        })

      } else {

        let productPriceInNumber = Number(quantity);

        if (this.$refs.addToCart.validate()) {

          this.showLoadingInformation = true;

          this.disableShoppingCartButton = true;

          this.loadButton = true;

          let selectedProductVariantCombinationCode = null;

          if (this.productDetail['product_variants'].length > 0) {

            selectedProductVariantCombinationCode = this.productDetail['product_variants'].find(data => data['variant_value_code_combination'] === this.selectedVariantCodeName);

          }

          if (this.productDetail['product_variant_info'].length === 0) {

            this.loadButton = true;

            this.$store.dispatch("cart/addProductToCart", {

              quantity: productPriceInNumber,

              product_slug: this.$route.params.slug,

              package_code: this.selectedProductPackage

            }).then(response => {

              console.log(response, 'response');

              this.stockAvailableInCart = response['data']['quantity'];

              this.productOrVariantPackageType = response.data['product_packaging_types'];

              let findThePackageTypeThatIsSelected = this.productOrVariantPackageType.find(data => data.package_code === response.data.package_code);

              this.variantStockAvailable = findThePackageTypeThatIsSelected['display_stock'];

              this.$store.dispatch("cart/loadAllCartProductsCount").then(() => {

                this.showLoadingInformation = false;

                this.disableShoppingCartButton = false;

              }).catch(() => {

                this.showLoadingInformation = false;

                this.disableShoppingCartButton = false;

              });

              this.success = true;

              this.showLoadingInformation = false;

              this.disableShoppingCartButton = false;

              console.log(response.data.message, 'response');

              this.$store.commit('notification/COMMIT_SNACKBAR', {

                message: response['data']['message'],

                color: 'success'

              })

              this.loadButton = false;

              this.priceForVariant = 1;

              this.$refs.addToCart.resetValidation();

            }).catch(e => {

              console.log(e, 'error');

              this.priceForVariant = 1;

              this.success = false;

              this.showLoadingInformation = false;

              this.disableShoppingCartButton = false;

              this.$store.commit('notification/COMMIT_SNACKBAR', {

                message: this.$store.state.login.error.message,

                color: 'error'

              })

              this.loadButton = false;

            }).finally(() => {

              this.success = false;

              this.disableShoppingCartButton = false;

              this.priceForVariant = 1;

              this.showLoadingInformation = false;

            });
            ;


          } else if (this.productDetail['product_variant_info'].length === this.totalVariant.length) {

            this.$store.dispatch("cart/addProductToCart", {

              combination_name: selectedProductVariantCombinationCode['product_variant_code'],

              quantity: productPriceInNumber,

              product_slug: this.$route.params.slug,

              package_code: this.selectedProductPackage

            }).then(response => {

              console.log(response, 'cart response');

              this.stockAvailableInCart = response['data']['quantity'];

              this.productOrVariantPackageType = response.data.product_packaging_types;

              let findThePackageTypeThatIsSelected = this.productOrVariantPackageType.find(data => data.package_code === response.data.package_code);

              this.variantStockAvailable = findThePackageTypeThatIsSelected['display_stock'];

              this.$store.dispatch("cart/loadAllCartProductsCount")

              this.success = true;

              this.disableShoppingCartButton = false;

              this.$store.commit('notification/COMMIT_SNACKBAR', {

                message: response['message'],

                color: 'success'

              })

              this.showLoadingInformation = false;

              this.loadButton = false;

              this.priceForVariant = 1;

              this.$refs.addToCart.resetValidation();

            }).catch(e => {

              console.log(e, 'response');

              this.success = false;

              this.disableShoppingCartButton = false;

              this.priceForVariant = 1;

              this.showLoadingInformation = false;

              this.$store.commit('notification/COMMIT_SNACKBAR', {

                message: this.$store.state.login.error.message,

                color: 'error'

              })

              this.disableShoppingCartButton = false;

              this.loadButton = false;

            }).finally(() => {

              this.success = false;

              this.disableShoppingCartButton = false;

              this.priceForVariant = 1;

              this.showLoadingInformation = false;

            });

          } else {

            this.success = false;

            this.showLoadingInformation = false;

            if (!this.priceForVariant) {

              this.$store.commit('notification/COMMIT_SNACKBAR', {

                message: 'Please Enter Quantity.',

                color: 'primary'

              })

            } else {

              this.$store.commit('notification/COMMIT_SNACKBAR', {

                message: 'Please Select Variant.',

                color: 'primary'

              })

            }

            this.loadButton = false;

          }

          this.$refs.addToCart.resetValidation();

        } else {

          this.loadButton = false;

        }

      }

    },

  }

}
</script>

<style scoped>

</style>
