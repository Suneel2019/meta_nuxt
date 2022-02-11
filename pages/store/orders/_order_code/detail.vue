<template>
  <v-container fluid>
    <v-row dense class="mb-0 mt-0 mt-xl-3 mt-lg-3 pt-2 pa-1" style="background-color: #e1e7ef">
      <v-col cols="12" xl="8" lg="8" md="8">
          <span class="product_main_title font-weight-medium text-uppercase ml-2"> Order Detail for Code: <span
            class="font-weight-bold ml-2">{{ singleOrderDetail.store_order_code }}</span></span>
      </v-col>
    </v-row>
    <v-row class="pa-3" dense style="background-color: #e1e7ef">
      <v-col cols="6" xl="3" lg="3">
        <span class="caption font-weight-medium">Delivery Status : </span>
        <v-chip small label text-color="white" dark
                :color="deliveryStatusColor[singleOrderDetail.delivery_status]">
          {{ singleOrderDetail['delivery_status'] }}
        </v-chip>
      </v-col>
      <v-col cols="6" xl="3" lg="3">
        <span class="caption font-weight-medium">Price:</span><span class="caption ml-2"> Rs. {{
          singleOrderDetail.total_price
        }}</span>
      </v-col>
      <v-col v-if="singleOrderDetail.delivery_status==='under-verification'" cols="6" xl="3" lg="3">
        <span class="caption font-weight-medium">Payable Price : </span><span
        class="caption ml-2">N/A</span>
      </v-col>
      <v-col v-else cols="6" xl="3" lg="3">
        <span class="caption font-weight-medium">Payable Price : </span><span
        class="caption ml-2">Rs. {{ singleOrderDetail.acceptable_price }}</span>
      </v-col>
    </v-row>
    <v-row class="mt-3" dense>
      <v-data-table
        v-if="taxableOrdersProducts.length>0"
        :headers="orderProductHeaders"
        :items="taxableOrdersProducts"
        class="elevation-1"
        no-data-text="No Orders Available at the moment."
        style="width: 100%"
      >
        <template v-slot:top>
          <v-toolbar flat :height="$mq==='desktop' || $mq==='laptop' || $mq==='xlscreen'?135:250">
            <v-row dense class="mb-2">
              <v-col cols="12" xl="6" lg="6" class="title font-weight-medium mt-12 mt-xl-0 mt-lg-0">Taxable Products
                Order
              </v-col>
              <v-spacer></v-spacer>
              <v-col v-if="taxableOrdersProducts.length>0" cols="12" xl="3" lg="3">
                <v-card elevation="0" color="#e1e7ef" tile class="px-2 mt-3">
                  <v-row dense>
                    <v-col cols="12">
                      <v-row dense>
                        <v-col cols="12" style="background: white;">
                          <div class="caption text-center font-weight-medium">Total Price</div>
                        </v-col>
                        <v-col cols="6">
                          <div class="caption font-weight-medium">({{ taxableQuantity }} items)</div>
                        </v-col>
                        <v-col cols="6">
                          <div class="caption font-weight-medium">Rs. {{ taxablePrice.toFixed(2) }}</div>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12" style="border-bottom: 1px solid white;">
                      <v-row dense>
                        <v-col cols="6">
                          <div class="caption font-weight-medium">13% VAT:</div>
                        </v-col>
                        <v-col cols="6">
                          <div class="caption font-weight-medium">Rs. {{ taxAmount.toFixed(2) }}</div>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12">
                      <v-row dense>
                        <v-col cols="6">
                          <div class="caption font-weight-medium">Total Price:</div>
                        </v-col>
                        <v-col cols="6">
                          <div class="caption font-weight-medium">Rs. {{ totalTaxAddedPrice.toFixed(2) }}</div>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
              <v-col
                v-if="taxableOrderAcceptedProducts.length>0 && singleOrderDetail.acceptable_price !=='N/A'"
                cols="12" xl="3" lg="3">
                <v-card elevation="0" color="#c1c8d2" tile class="px-2 mt-3">
                  <v-row dense>
                    <v-col cols="12">
                      <v-row dense>
                        <v-col cols="12" style="background: white;">
                          <div class="caption text-center font-weight-medium">Total Payable Price</div>
                        </v-col>
                        <v-col cols="6">
                          <div class="caption font-weight-medium">({{ taxableAcceptedQuantity }} items)</div>
                        </v-col>
                        <v-col cols="6">
                          <div class="caption font-weight-medium">Rs. {{ taxableAcceptedPrice.toFixed(2) }}</div>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12" style="border-bottom: 1px solid white;">
                      <v-row dense>
                        <v-col cols="6">
                          <div class="caption font-weight-medium">13% VAT:</div>
                        </v-col>
                        <v-col cols="6">
                          <div class="caption font-weight-medium">Rs. {{ taxAcceptedAmount.toFixed(2) }}</div>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12">
                      <v-row dense>
                        <v-col cols="6">
                          <div class="caption font-weight-medium">Total Price:</div>
                        </v-col>
                        <v-col cols="6">
                          <div class="caption font-weight-medium">Rs. {{
                              totalTaxAddedAcceptedPrice.toFixed(2)
                            }}
                          </div>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </v-toolbar>
        </template>
        <template v-slot:item.serial_no="{item}">
          <span class="font-weight-medium">{{ item.serial_no }}.</span>
        </template>
        <template v-slot:item.product.product_name="{item}">
          <span class="font-weight-medium">{{ item.product.product_name }}</span>
          <div class="mt-2">
              <span v-if="item.product_variant"
                    class="font-weight-regular caption">Variants: {{ item.product_variant.product_variant_name }}</span>
          </div>
        </template>
        <template class="pa-3" v-slot:item.product.featured_image="{item}">
          <v-img @click="showImagePreview(item.product.featured_image)" class="ma-2 links" height="40"
                 width="40"
                 :src="item.product.featured_image"></v-img>
        </template>
        <template v-slot:item.initial_order_quantity="{item}">
          <span class="font-weight-medium">{{ item.initial_order_quantity }}</span>
        </template>
        <template v-slot:item.package_name="{item}">
          <span class="font-weight-medium">{{ item.package_name }}</span>
        </template>
        <template v-slot:item.quantity="{item}">
            <span class="font-weight-medium">{{ item.quantity }}
              <v-icon size="17" v-if=" item.initial_order_quantity && item.quantity>item.initial_order_quantity"
                      color="green">
                arrow_upward
              </v-icon>
              <v-icon size="17" v-if="item.initial_order_quantity && item.quantity<item.initial_order_quantity"
                      color="red">
                arrow_downward
              </v-icon>
            </span>
        </template>
        <template v-slot:item.unit_rate="{item}">
          <span class="font-weight-medium">Rs. {{ item.unit_rate.toFixed(2) }}</span>
        </template>
        <template v-slot:item.sub_total="{item}">
          <span class="font-weight-medium">Rs. {{ item.sub_total.toFixed(2) }}</span>
        </template>
        <template v-slot:item.acceptance_status="{item}">
          <v-chip label small text-color="white" :color="acceptance[item.acceptance_status]">
            <span class="text-uppercase">{{ item.acceptance_status }}</span>
          </v-chip>
        </template>
      </v-data-table>
    </v-row>
    <v-row class="mt-3" dense>
      <v-data-table
        v-if="nonTaxableOrdersProducts.length>0"
        :headers="orderProductHeaders"
        :items="nonTaxableOrdersProducts"
        class="elevation-1"
        no-data-text="No Orders Available at the moment."
        style="width: 100%"
      >
        <template v-slot:top>
          <v-toolbar flat :height="$mq==='desktop' || $mq==='laptop' || $mq==='xlscreen'?135:250">
            <v-row dense>
              <v-col cols="12" xl="6" lg="6" class="title font-weight-medium mt-12 mt-xl-0 mt-lg-0">Non-Taxable Products
                Order
              </v-col>
              <v-spacer></v-spacer>
              <v-col v-if="nonTaxableOrdersProducts.length>0" cols="12" xl="3" lg="3">
                <v-card elevation="0" color="#e1e7ef" tile class="px-2 mt-3">
                  <v-row dense>
                    <v-col cols="12" style="border-bottom: 1px solid white;">
                      <v-row dense>
                        <v-col cols="12" style="background: white;">
                          <div class="caption text-center font-weight-medium">Total Price</div>
                        </v-col>
                        <v-col cols="6">
                          <div class="caption font-weight-medium">({{ nonTaxableQuantity }} items)</div>
                        </v-col>
                        <v-col cols="6">
                          <div class="caption font-weight-medium">Rs. {{ nonTaxablePrice.toFixed(2) }}</div>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12">
                      <v-row dense>
                        <v-col cols="6">
                          <div class="caption font-weight-medium">Total Price :</div>
                        </v-col>
                        <v-col cols="6">
                          <div class="caption font-weight-medium">Rs. {{ nonTaxablePrice.toFixed(2) }}</div>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
              <v-col
                v-if="nonTaxableOrderAcceptedProducts.length>0 && singleOrderDetail.acceptable_price !=='N/A'"
                cols="12" xl="3" lg="3">
                <v-card elevation="0" color="#c1c8d2" tile class="px-2 mt-3">
                  <v-row dense>
                    <v-col cols="12" style="border-bottom: 1px solid white;">
                      <v-row dense>
                        <v-col cols="12" style="background: white;">
                          <div class="caption text-center font-weight-medium">Total Payable Price</div>
                        </v-col>
                        <v-col cols="6">
                          <div class="caption font-weight-medium">({{ nonTaxableAcceptedQuantity }} items)</div>
                        </v-col>
                        <v-col cols="6">
                          <div class="caption font-weight-medium">Rs. {{ nonTaxableAcceptedPrice.toFixed(2) }}</div>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12">
                      <v-row dense>
                        <v-col cols="6">
                          <div class="caption font-weight-medium">Total Price :</div>
                        </v-col>
                        <v-col cols="6">
                          <div class="caption font-weight-medium">Rs. {{ nonTaxableAcceptedPrice.toFixed(2) }}</div>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </v-toolbar>
        </template>
        <template v-slot:item.serial_no="{item}">
          <span class="font-weight-medium">{{ item.serial_no }}.</span>
        </template>
        <template v-slot:item.product.product_name="{item}">
          <span class="font-weight-medium">{{ item.product.product_name }}</span>
          <div class="mt-2">
              <span v-if="item.product_variant"
                    class="font-weight-regular caption">Variants: {{ item.product_variant.product_variant_name }}</span>
          </div>
        </template>
        <template class="pa-3" v-slot:item.product.featured_image="{item}">
          <v-img @click="showImagePreview(item.product.featured_image)" class="ma-2 links" height="40"
                 width="40"
                 :src="item.product.featured_image"></v-img>
        </template>
        <template v-slot:item.initial_order_quantity="{item}">
          <span class="font-weight-medium">{{ item.initial_order_quantity }}</span>
        </template>
        <template v-slot:item.package_name="{item}">
          <span class="font-weight-medium">{{ item.package_name }}</span>
        </template>
        <template v-slot:item.quantity="{item}">
            <span class="font-weight-medium">{{ item.quantity }}
               <v-icon size="17" v-if="item.initial_order_quantity && item.quantity>item.initial_order_quantity"
                       color="green">
                arrow_upward
              </v-icon>
              <v-icon size="17" v-if="item.initial_order_quantity && item.quantity<item.initial_order_quantity"
                      color="red">
                arrow_downward
              </v-icon>
            </span>
        </template>
        <template v-slot:item.unit_rate="{item}">
          <span class="font-weight-medium">Rs. {{ item.unit_rate.toFixed(2) }}</span>
        </template>
        <template v-slot:item.sub_total="{item}">
          <span class="font-weight-medium">Rs. {{ item.sub_total.toFixed(2) }}</span>
        </template>
        <template v-slot:item.acceptance_status="{item}">
          <v-chip label small text-color="white" :color="acceptance[item.acceptance_status]">
            <span class="text-uppercase">{{ item.acceptance_status }}</span>
          </v-chip>
        </template>
      </v-data-table>
    </v-row>
    <v-row v-if="singleOrderDetail.dispatched_detail" dense class="mt-6">
      <v-card tile width="100%" elevation="3">
        <v-toolbar height="45" color="#e1e7ef">
          <span class="subtitle-1">Store Order Dispatch Details:</span>
        </v-toolbar>
        <v-card-text class="px-0">
          <v-row no-gutters>
            <v-col cols="1" xl="1" lg="1">
              <div class="text-center caption font-weight-bold">S.No.</div>
            </v-col>
            <v-col cols="3">
              <div class="text-center caption font-weight-bold">Driver Name</div>
            </v-col>
            <v-col cols="1">
              <div class="text-center caption font-weight-bold">Vehicle Type</div>
            </v-col>
            <v-col cols="2">
              <div class="text-center caption font-weight-bold">Vehicle No.</div>
            </v-col>
            <v-col cols="2">
              <div class="text-center caption font-weight-bold">Contact No.</div>
            </v-col>
            <v-col cols="3">
              <div class="text-center caption font-weight-bold">Expected Delivery Time</div>
            </v-col>
          </v-row>
          <v-row no-gutters class="mt-2">
            <v-col cols="1">
              <div class="caption text-center font-weight-medium">1.</div>
            </v-col>
            <v-col cols="3">
              <div class="caption text-center font-weight-medium">
                {{ singleOrderDetail.dispatched_detail.driver_name }}
              </div>
            </v-col>
            <v-col cols="1">
              <div class="caption text-center font-weight-medium">
                {{ singleOrderDetail.dispatched_detail.vehicle_type }}
              </div>
            </v-col>
            <v-col cols="2">
              <div class="caption text-center font-weight-medium">
                {{ singleOrderDetail.dispatched_detail.vehicle_number }}
              </div>
            </v-col>
            <v-col cols="2">
              <div class="caption text-center font-weight-medium">
                {{ singleOrderDetail.dispatched_detail.vehicle_contact_number }}
              </div>
            </v-col>
            <v-col cols="3">
              <div class="caption text-center font-weight-medium">
                {{ singleOrderDetail.dispatched_detail.expected_delivery_time }}
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-row>
    <v-row dense class="mt-6">
      <v-data-table
        :headers="statusLogHeaders"
        :items="singleOrderDetail.status_log"
        class="elevation-1"
        no-data-text="No Orders Available at the moment."
        style="width: 100%"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Order Status Change Log</v-toolbar-title>
          </v-toolbar>
        </template>
        <template v-slot:item.serial_no="{item}">
          <span class="font-weight-medium">{{ item.serial_no }}</span>
        </template>
        <template v-slot:item.status="{item}">
          <v-chip label text-color="white" small
                  :color="statusDeliveryStatus[item.status]"
                  dark
          >
            <span class="text-uppercase font-weight-medium">{{ item.status }}</span>
          </v-chip>
        </template>
        <template v-slot:item.status_update_date="{item}">
          <span class="font-weight-medium">{{ item.status_update_date }}</span>
        </template>
        <template v-slot:item.remarks="{item}">
            <span class="font-weight-medium" v-if="item.remarks">
              <v-btn @click="showRemarksInDialog(item.remarks)" small dark color="primary">Show remarks</v-btn>
            </span>
          <span class="font-weight-medium" v-else>No Remarks</span>
        </template>
      </v-data-table>
    </v-row>
    <v-dialog
      persistent
      v-model="showRemarksDialog"
      width="500"
    >
      <v-card color="grey lighten-4">
        <v-card-title
          class="subtitle-1 primary lighten-1"
          primary-title
        >
          <v-icon class="mr-2" color="white" size="20">info</v-icon>
          <span class="white--text">Remarks</span>
        </v-card-title>
        <v-card-text style="min-height: 100px;" class="pt-4">
          <span v-html="remarksMessage"></span>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="grey lighten-3">
          <v-spacer></v-spacer>
          <v-btn
            small
            color="red"
            text
            @click="showRemarksDialog=!showRemarksDialog"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showImagePreviewDialog" width="450">
      <v-img width="450" height="550" :src="selectedImage"></v-img>
    </v-dialog>
  </v-container>
</template>

<script>
import storeOrderService from "@/services/store/store-order"
import errorHandler from "@/helpers/shared/errorHandler";

export default {

  name: "store-orders-order_code-detail",

  layout: 'store-dashboard',

  data() {

    return {

      loading: false,
      deliveryStatusColor: {
        'PENDING': 'orange',
        'ACCEPTED': 'success'
      },
      statusDeliveryStatus: {
        'pending': 'orange',
        'cancelled': 'red',
        'accepted': 'success'
      },
      singleOrderDetail: [],
      statusLogHeaders: [
        {
          text: 'S.N.',
          sortable: false,
          align: 'left',
          value: 'serial_no',
        },
        {
          text: 'Delivery Status',
          sortable: false,
          align: 'left',
          value: 'status',
        },
        {
          text: 'Status Updated',
          align: 'left',
          sortable: false,
          value: 'status_update_date',
        },
        {
          text: 'Remarks',
          align: 'center',
          sortable: false,
          value: 'remarks',
        },
      ],
      acceptance: {
        'rejected': 'red',
        'accepted': 'green',
        'pending': 'orange'
      },
      showRemarksDialog: false,
      remarksMessage: '',
      generateBillForCode: null,
      showPrintBillDialog: false,
      printingFiles: [],
      loadPrintBill: false,
      nonTaxableOrdersProducts: [],
      taxableOrdersProducts: [],
      taxableQuantity: 0,
      nonTaxableQuantity: 0,
      taxablePrice: 0,
      nonTaxablePrice: 0,
      taxAmount: 0,
      priceWithoutTax: 0,
      selectedImage: '',
      showImagePreviewDialog: false,
      totalTaxAddedPrice: 0,
      taxableOrderAcceptedProducts: [],
      nonTaxableOrderAcceptedProducts: [],
      taxableAcceptedPrice: 0,
      nonTaxableAcceptedPrice: 0,
      taxableAcceptedQuantity: 0,
      nonTaxableAcceptedQuantity: 0,
      taxAcceptedAmount: 0,
      totalTaxAddedAcceptedPrice: 0,

    }

  },

  fetch() {

    this.showOrderDetail();

  },

  computed: {

    orderProductHeaders() {

      if (this.singleOrderDetail.delivery_status === 'under-verification' || this.singleOrderDetail.delivery_status === 'pending') {

        return [
          {
            text: 'S.N.',
            sortable: false,
            align: 'left',
            value: 'serial_no',
          },
          {
            text: 'Product Name',
            sortable: false,
            align: 'left',
            value: 'product.product_name',
          },
          {
            text: 'Product Image',
            sortable: false,
            align: 'left',
            value: 'product.featured_image',
          },
          {
            text: 'Quantity',
            sortable: false,
            align: 'left',
            value: 'initial_order_quantity',
          },
          {
            text: 'Package Type',
            sortable: false,
            align: 'left',
            value: 'package_name',
          },
          {
            text: 'Unit Rate',
            sortable: false,
            align: 'left',
            value: 'unit_rate',
          },
          {
            text: 'Total Amount',
            sortable: false,
            align: 'left',
            value: 'sub_total',
          },
        ]

      } else {

        return [
          {
            text: 'S.N.',
            sortable: false,
            align: 'left',
            value: 'serial_no',
          },
          {
            text: 'Product Name',
            sortable: false,
            align: 'left',
            value: 'product.product_name',
          },
          {
            text: 'Product Image',
            sortable: false,
            align: 'left',
            value: 'product.featured_image',
          },
          {
            text: 'Initial Quantity',
            sortable: false,
            align: 'left',
            value: 'initial_order_quantity',
          },
          {
            text: 'Package Type',
            sortable: false,
            align: 'left',
            value: 'package_name',
          },
          {
            text: 'Dispatching Quantity',
            sortable: false,
            align: 'left',
            value: 'quantity',
          },
          {
            text: 'Unit Rate',
            sortable: false,
            align: 'left',
            value: 'unit_rate',
          },
          {
            text: 'Total Amount',
            sortable: false,
            align: 'left',
            value: 'sub_total',
          },
          {
            text: 'Accepted',
            sortable: false,
            align: 'left',
            value: 'acceptance_status',
          },
        ]

      }

    }

  },

  methods: {

    showImagePreview(image) {

      this.showImagePreviewDialog = true;

      this.selectedImage = image;

    },

    showOrderDetail() {

      this.loading = true;

      storeOrderService.getSingleOrderDetail(this.$route.params.order_code).then(response => {

        console.log(response.data, 'response');

        response.data.details.map((value, index) => {

          value.serial_no = index + 1;

        });

        response.data.status_log.map((value, index) => {

          value.serial_no = index + 1;

        });

        this.singleOrderDetail = response.data;

        for (let i = 0; i < response.data.details.length; i++) {

          if (response.data.details[i]['product']['is_taxable']) {

            this.taxableOrdersProducts.push({
              'acceptance_status': response.data.details[i]['acceptance_status'],
              'is_accepted': response.data.details[i]['is_accepted'],
              'product': response.data.details[i]['product'],
              'product_variant': response.data.details[i]['product_variant'],
              'store_order_detail_code': response.data.details[i]['store_order_detail_code'],
              'initial_order_quantity': response.data.details[i]['initial_order_quantity'],
              'quantity': response.data.details[i]['quantity'],
              'sub_total': response.data.details[i]['sub_total'],
              'unit_rate': response.data.details[i]['unit_rate'],
              'package_name': response.data.details[i]['package_name']
            });

            this.taxableOrdersProducts.map((data, index) => {

              data.serial_no = index + 1

            });

            if (response.data.details[i]['acceptance_status'] === 'accepted') {
              this.taxableOrderAcceptedProducts.push({
                'acceptance_status': response.data.details[i]['acceptance_status'],
                'is_accepted': response.data.details[i]['is_accepted'],
                'product': response.data.details[i]['product'],
                'product_variant': response.data.details[i]['product_variant'],
                'store_order_detail_code': response.data.details[i]['store_order_detail_code'],
                'quantity': response.data.details[i]['quantity'],
                'initial_order_quantity': response.data.details[i]['initial_order_quantity'],
                'sub_total': response.data.details[i]['sub_total'],
                'unit_rate': response.data.details[i]['unit_rate'],
                'package_name': response.data.details[i]['package_name']
              });
            }

          } else {

            this.nonTaxableOrdersProducts.push({
              'acceptance_status': response.data.details[i]['acceptance_status'],
              'is_accepted': response.data.details[i]['is_accepted'],
              'product': response.data.details[i]['product'],
              'product_variant': response.data.details[i]['product_variant'],
              'store_order_detail_code': response.data.details[i]['store_order_detail_code'],
              'quantity': response.data.details[i]['quantity'],
              'sub_total': response.data.details[i]['sub_total'],
              'unit_rate': response.data.details[i]['unit_rate'],
              'initial_order_quantity': response.data.details[i]['initial_order_quantity'],
              'package_name': response.data.details[i]['package_name']
            });

            this.nonTaxableOrdersProducts.map((data, index) => {

              data.serial_no = index + 1

            });

            if (response.data.data.details[i]['acceptance_status'] === 'accepted') {
              this.nonTaxableOrderAcceptedProducts.push({
                'acceptance_status': response.data.details[i]['acceptance_status'],
                'is_accepted': response.data.details[i]['is_accepted'],
                'product': response.data.details[i]['product'],
                'product_variant': response.data.details[i]['product_variant'],
                'store_order_detail_code': response.data.details[i]['store_order_detail_code'],
                'quantity': response.data.details[i]['quantity'],
                'sub_total': response.data.details[i]['sub_total'],
                'unit_rate': response.data.details[i]['unit_rate'],
                'initial_order_quantity': response.data.details[i]['initial_order_quantity'],
                'package_name': response.data.details[i]['package_name']
              });
            }

          }

        }

        this.totalTaxableProductQuantity();

        this.totalNonTaxableProductQuantity();

        this.totalTaxableAcceptedProductQuantity();

        this.totalNonTaxableAcceptedProductQuantity();

        this.taxableProductPrice();

        this.nonTaxableProductPrice();

        this.taxableAcceptedProductPrice();

        this.nonTaxableAcceptedProductPrice();

        this.taxableProductVat();

        this.taxableAcceptedProductVat();

        this.productPriceWithoutTax();

        this.showTaxPrice();

        this.showTaxAcceptedPrice();

        this.loading = false;

      }).catch(e => {

        errorHandler(e, this);

        this.loading = false;

      })

    },

    showRemarksInDialog(message) {

      this.showRemarksDialog = true;

      this.remarksMessage = message;

    },

    showTaxPrice() {

      this.totalTaxAddedPrice = this.taxAmount + this.taxablePrice;

    },

    showTaxAcceptedPrice() {

      this.totalTaxAddedAcceptedPrice = this.taxAcceptedAmount + this.taxableAcceptedPrice;

    },

    productPriceWithoutTax() {

      this.priceWithoutTax = this.taxablePrice - this.taxAmount;

    },

    taxableProductPrice() {

      this.taxableOrdersProducts.map(data => {

        if (data.initial_order_quantity) {

          this.taxableQuantity += data.initial_order_quantity;

        } else {

          this.taxableQuantity += data.quantity;

        }

      });

    },

    totalTaxableAcceptedProductQuantity() {

      this.taxableOrderAcceptedProducts.map(data => {

        this.taxableAcceptedQuantity += data.quantity;

      });

    },

    totalNonTaxableAcceptedProductQuantity() {

      this.nonTaxableOrderAcceptedProducts.map(data => {

        this.nonTaxableAcceptedQuantity += data.quantity;

      });

    },

    taxableProductVat() {

      this.taxAmount = (13 / 100) * this.taxablePrice;

    },

    taxableAcceptedProductVat() {

      this.taxAcceptedAmount = (13 / 100) * this.taxableAcceptedPrice;

    },

    nonTaxableProductPrice() {

      this.nonTaxableOrdersProducts.map(data => {

        if (data.initial_order_quantity) {

          this.nonTaxablePrice += data.unit_rate * data.initial_order_quantity;

        } else {

          this.nonTaxablePrice += data.sub_total;

        }

      });

    },

    totalTaxableProductQuantity() {

      this.taxableOrdersProducts.map(data => {

        if (data.initial_order_quantity) {

          this.taxablePrice += (data.unit_rate) * (data.initial_order_quantity);

        } else {

          this.taxablePrice += data.sub_total;

        }

      });

    },

    taxableAcceptedProductPrice() {

      this.taxableOrderAcceptedProducts.map(data => {

        this.taxableAcceptedPrice += data.sub_total;

      });

    },

    nonTaxableAcceptedProductPrice() {

      this.nonTaxableOrderAcceptedProducts.map(data => {

        this.nonTaxableAcceptedPrice += data.sub_total;

      });

    },

    totalNonTaxableProductQuantity() {

      this.nonTaxableOrdersProducts.map(data => {

        if (data.initial_order_quantity) {

          this.nonTaxableQuantity += data.initial_order_quantity;

        } else {

          this.nonTaxableQuantity += data.quantity;

        }

      });

    },

  }

}
</script>

<style scoped>

</style>
