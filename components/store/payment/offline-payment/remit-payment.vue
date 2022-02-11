<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-card outlined>
        <v-row no-gutters>
          <v-col cols="12" class="subtitle-1 font-weight-medium headerPrimaryColor px-3 pt-1 pb-1 mb-3">
            Remit Payment
          </v-col>

<!--          <v-col-->
<!--              cols="12"-->
<!--              class="px-3"-->
<!--              v-if="serverErrors.length !== 0"-->
<!--          >-->
<!--            <server-errors :errors="serverErrors"></server-errors>-->
<!--          </v-col>-->
          <ErrorHandling422 v-if="isError422"></ErrorHandling422>

          <v-col cols="12" class="px-3 pb-3">
            <v-form ref="offlinePaymentForm" :disabled="is_from_impersonate">
              <v-card outlined>
                <v-row no-gutters>
                  <v-col cols="12" class="body-2 font-weight-medium headerPrimaryColor px-3 pt-2 pb-1 mb-5">
                    Receiver Information
                  </v-col>

                  <v-col cols="12">
                    <v-row no-gutters>
                      <v-col cols="12" class="px-3">
                        <v-row no-gutters justify="space-between">
                          <v-col cols="5" sm="5" md="3">
                            Receiver Name: <span class="red--text">*</span>
                            <v-text-field
                                solo
                                flat
                                dense
                                placeholder="Receiver Name"
                                class="simple_text_field mt-1"
                                v-model="receiverInformation.receiverName"
                                :rules="receiverNameRule">
                            </v-text-field>
                          </v-col>

                          <v-col cols="5" sm="5" md="3">
                            Bank Name: <span class="red--text">*</span>
                            <v-autocomplete
                                solo
                                flat
                                dense
                                return-object
                                item-text="bank_name"
                                placeholder="-- Select Bank --"
                                class="auto_complete_with_append_inner_icon mt-1"
                                :items="bankList"
                                v-model="receiverInformation.selectedBank"
                                :rules="bankRule">
                            </v-autocomplete>
                          </v-col>

                          <v-col cols="5" sm="5" md="3">
                            Account Number: <span class="red--text">*</span>
                            <v-text-field
                                solo
                                flat
                                dense
                                placeholder="Account number"
                                class="simple_text_field mt-1"
                                v-model="receiverInformation.accountNo"
                                :rules="accountNoRule">
                            </v-text-field>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card>

              <v-card outlined class="mt-5 pb-5">
                <v-row no-gutters>
                  <v-col cols="12" class="body-2 font-weight-medium headerPrimaryColor px-3 pt-2 pb-1 mb-5">
                    Sender Information
                  </v-col>

                  <v-col cols="12">
                    <v-row no-gutters>
                      <v-col cols="12" class="px-3">
                        <v-row no-gutters justify="space-between">
                          <v-col cols="5" sm="5" md="3">
                            Remit Name: <span class="red--text">*</span>
                            <v-autocomplete
                                solo
                                flat
                                dense
                                return-object
                                item-text="remit_name"
                                placeholder="-- Select Remit --"
                                class="auto_complete_with_append_inner_icon mt-1"
                                :items="remitList"
                                v-model="senderInformation.selectedRemit"
                                :rules="remitNameRule">
                            </v-autocomplete>
                          </v-col>

                          <v-col cols="5" sm="5" md="3">
                            Branch Name: <span class="red--text">*</span>
                            <v-text-field
                                solo
                                flat
                                dense
                                placeholder="Account holder name"
                                class="simple_text_field mt-1"
                                v-model="senderInformation.branchName"
                                :rules="branchNameRule">
                            </v-text-field>
                          </v-col>

                          <v-col cols="5" sm="5" md="3">
                            Deposited By: <span class="red--text">*</span>
                            <v-text-field
                                solo
                                flat
                                dense
                                placeholder="Deposited Name"
                                class="simple_text_field mt-1"
                                v-model="senderInformation.depositedBy"
                                :rules="depositedByRule">
                            </v-text-field>
                          </v-col>
                        </v-row>
                      </v-col>

                      <v-col cols="12" class="px-3">
                        <v-row no-gutters justify="space-between">
                          <v-col cols="5" sm="5" md="3">
                            Amount: <span class="red--text">*</span>
                            <v-text-field
                                solo
                                flat
                                dense
                                class="simple_text_field mt-1"
                                placeholder="Deposited Amount"
                                v-model="senderInformation.amount"
                                :rules="amountRules">
                            </v-text-field>
                          </v-col>



                          <v-col cols="5" sm="5" md="3">
                            Transaction Date: <span class="red--text">*</span>
                            <v-menu
                                offset-y
                                :nudge-right="40"
                                min-width="290px"
                                transition="scale-transition"
                                v-model="datePickerMenu">
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    solo
                                    flat
                                    dense
                                    v-on="on"
                                    v-bind="attrs"
                                    prepend-inner-icon="event"
                                    placeholder="-- Select Date --"
                                    class="text_field_with_prepend_inner_icon mt-1"
                                    v-model="senderInformation.transactionDate">
                                </v-text-field>
                              </template>
                              <v-date-picker
                                  color="primary"
                                  v-model="senderInformation.transactionDate">
                              </v-date-picker>
                            </v-menu>
                          </v-col>

                          <v-col cols="5" sm="5" md="3">
                            Contact Number: <span class="red--text">*</span>
                            <v-text-field
                                solo
                                flat
                                dense
                                placeholder="Contact Number"
                                class="simple_text_field mt-1"
                                v-model="senderInformation.contactNo"
                                :rules="contactNoRule">
                            </v-text-field>
                          </v-col>
                        </v-row>
                      </v-col>

                      <v-col cols="12" class="px-3">
                        <v-row no-gutters justify="space-between">
                          <v-col cols="5" sm="5" md="3">
                            <v-row no-gutters>
                              <v-col cols="12">
                                Transaction Number: <span class="red--text">*</span>
                              </v-col>

                              <v-col
                                  cols="12"
                                  v-for="(item, idx) in senderInformation.transactionNo"
                                  :key="idx"
                              >
                                <v-row no-gutters>
                                  <v-col cols="10">
                                    <v-text-field
                                        solo
                                        flat
                                        dense
                                        placeholder="Transaction Number"
                                        class="simple_text_field mt-1"
                                        v-model="item.transactionNo"
                                        :rules="transactionNoRule">
                                    </v-text-field>
                                  </v-col>

                                  <v-col cols="2" class="text-end mt-1">
                                    <v-btn
                                        fab
                                        x-small
                                        color="error"
                                        :disabled="canDeleteTransaction"
                                        @click="deleteTransactionNumber(idx)"
                                    >
                                      <v-icon>mdi-minus</v-icon>
                                    </v-btn>
                                  </v-col>
                                </v-row>
                              </v-col>

                              <v-col cols="12" class="text-center">
                                <v-btn
                                    fab
                                    small
                                    color="primary"
                                    @click="addMoreTransactionNumber"
                                >
                                  <v-icon>mdi-plus</v-icon>
                                </v-btn>
                              </v-col>
                            </v-row>
                          </v-col>

                          <v-col cols="5" sm="5" md="3">
                            Upload Voucher: <span class="red--text">*</span>
                            <v-file-input
                                solo
                                flat
                                dense
                                prepend-icon=""
                                accept=".jpeg,.png"
                                class="file_input mt-1"
                                placeholder="Upload Document"
                                prepend-inner-icon="mdi-cloud-upload"
                                v-model="senderInformation.voucher"
                                :rules="voucherRule">
                            </v-file-input>
                          </v-col>

                          <v-col cols="3"></v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card>
            </v-form>
          </v-col>
        </v-row>
      </v-card>
    </v-col>

    <v-col cols="12" class="text-end px-3 mt-5">
      <v-btn
          small
          depressed
          color="primary"
          :loading="btnLoadingState"
          @click="saveOfflinePayment"
      >
        Save Changes
      </v-btn>

      <v-btn
          small
          depressed
          class="ml-3"
          color="error"
          @click="closeForm"
      >
        Cancel
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import WalletServices from "@/services/store/offline-payment";
import errorHandler from "@/helpers/shared/errorHandler";
import ErrorHandling422 from "../../../shared/ErrorHandling422";
export default {
  name: "RemitPayment",
  props:['referralCode'],
  components: {
    // ServerErrors: () => import('@shared~pages/errors/ServerErrors'),
  },
  data() {
    return {
      receiverInformation: {
        receiverName: '',
        selectedBank: '',
        accountNo: ''
      },
      senderInformation: {
        selectedRemit: '',
        branchName: '',
        depositedBy: '',
        amount: '',
        transactionDate: new Date().toISOString().substr(0, 10),
        contactNo: '',
        transactionNo: [
          {
            transactionNo: ''
          }
        ],
        voucher: []
      },
      bankList: [],
      remitList: [],
      receiverNameRule: [
        v => !!v || 'Receiver name is required.'
      ],
      bankRule: [
        v => !!v || 'Bank is required.'
      ],
      accountNoRule: [
        v => !!v || 'Account number is required.'
      ],
      remitNameRule: [
        v => !!v || 'Remit name is required.'
      ],
      branchNameRule: [
        v => !!v || 'Branch name is required.'
      ],
      depositedByRule: [
        v => !!v || 'Deposited By is required.'
      ],
      isFromBusinessPlan: false,
      amountRules: [
        v => !!v || 'Amount is required.',
        v => /^\d+$/.test(v) || 'Must be a number only.',
      ],
      contactNoRule: [
        v => !!v || 'Contact no. is required.',
        v => (v.length === 10) || 'Must be of 10 digits.'
      ],
      transactionNoRule: [
        v => !!v || 'Transaction number is required.'
      ],
      datePickerMenu: false,
      btnLoadingState: false,
      serverErrors: []
    }
  },
  async fetch() {
    let { data }  = await  WalletServices.getAllBankList();
    let remit = await WalletServices.getAllRemitsList();
    this.bankList = data;
    this.remitList = remit['data']
  },

  computed: {
    voucherRule() {
      return this.checkValidationForVoucher();
    },
    canDeleteTransaction() {
      return this.senderInformation.transactionNo.length === 1;
    },
    is_from_impersonate(){
      return this.$store.getters['login/GET_IS_FROM_IMPERSONATE']
    },
    isError422() {

      return this.$store.getters['error/IS422Error'];

    }
  },
  methods: {
    addMoreTransactionNumber() {
      this.senderInformation.transactionNo.push({transactionNo: ''});
    },
    deleteTransactionNumber(idx) {
      this.senderInformation.transactionNo.splice(idx, 1);
    },
    checkValidationForVoucher() {
      if (!this.senderInformation.voucher || this.senderInformation.voucher.length === 0) {
        return ['Document is required.'];
      } else if (this.senderInformation.voucher['size'] > (5 * 1024 * 1024)) {
        return ['Must be less than 5 MB.'];
      }
    },
    saveOfflinePayment() {
      if (!this.$refs.offlinePaymentForm.validate()) {
        return;
      }

      this.serverErrors = [];
      this.btnLoadingState = true;

      const data = new FormData();

      data.append('payment_for', 'load_balance');
      data.append('payment_type', 'remit');
      data.append('receiver_name', this.receiverInformation.receiverName);
      data.append('bank_code', this.receiverInformation.selectedBank['bank_code']);
      data.append('bank_name', this.receiverInformation.selectedBank['bank_name']);
      data.append('receiver_bank_account_name', this.receiverInformation.accountNo);
      data.append('remit_code', this.senderInformation.selectedRemit['remit_code']);
      data.append('remit_name', this.senderInformation.selectedRemit['remit_name']);
      data.append('remit_branch_name', this.senderInformation.branchName);
      data.append('deposited_by', this.senderInformation.depositedBy);
      data.append('amount', this.senderInformation.amount);
      data.append('transaction_date', this.senderInformation.transactionDate);
      data.append('contact_phone_no', this.senderInformation.contactNo);

      this.senderInformation.transactionNo.forEach((transactionNo, idx) => {
        data.append(`transaction_number[${idx}]`, transactionNo.transactionNo);
      });

      data.append('document_types[0]', 'voucher');
      data.append('document_images[0]', this.senderInformation.voucher);

      this.$store.dispatch("payment/savePayment", data).then(res => {
        this.btnLoadingState = false;

        this.$store.commit("error/SET_422_ERROR", false);

        this.$store.commit("error/SET_422_ERROR_MESSAGE", null);
        this.$store.commit('notification/COMMIT_DIALOG', {
          message: res.message,
          color:'green'
        });

        this.closeForm();
      }).catch(e => {
        errorHandler(e, this);

        this.btnLoadingState = false;
        window.scroll({
          top: 0,
          behavior: "smooth"
        });
      });
    },
    closeForm() {
      this.$emit('close-form');
    }
  }
}
</script>
