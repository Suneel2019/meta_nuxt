<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-card outlined>
        <v-row no-gutters>
          <v-col cols="12" class="subtitle-1 font-weight-medium headerPrimaryColor px-3 pt-1 pb-1 mb-3">
            Cheque Payment
          </v-col>

          <ErrorHandling422 v-if="isError422"></ErrorHandling422>

          <v-col cols="12" class="px-3 pb-3">
            <v-form ref="offlinePaymentForm">
              <v-card outlined>
                <v-row no-gutters>
                  <v-col cols="12" class="body-2 font-weight-medium headerPrimaryColor px-3 pt-2 pb-1 mb-5">
                    Sender Information
                  </v-col>

                  <v-col cols="12">
                    <v-row no-gutters>
                      <v-col cols="12" class="px-3">
                        <v-row no-gutters justify="space-between">
                          <v-col cols="5" sm="5" md="3">
                            Cheque Bank: <span class="red--text">*</span>
                            <v-autocomplete
                                solo
                                flat
                                dense
                                return-object
                                item-text="bank_name"
                                placeholder="-- Select Bank --"
                                class="auto_complete_with_append_inner_icon mt-1"
                                :items="bankList"
                                v-model="senderInformation.selectedBank"
                                :rules="bankRule">
                            </v-autocomplete>
                          </v-col>

                          <v-col cols="5" sm="5" md="3">
                            Account Holder Name: <span class="red--text">*</span>
                            <v-text-field
                                solo
                                flat
                                dense
                                placeholder="Account holder name"
                                class="simple_text_field mt-1"
                                v-model="senderInformation.accountHolderName"
                                :rules="accountHolderNameRule">
                            </v-text-field>
                          </v-col>

                          <v-col cols="5" sm="5" md="3">
                            Account Number: <span class="red--text">*</span>
                            <v-text-field
                                solo
                                flat
                                dense
                                placeholder="Account number"
                                class="simple_text_field mt-1"
                                v-model="senderInformation.accountNo"
                                :rules="accountNoRule">
                            </v-text-field>
                          </v-col>
                        </v-row>
                      </v-col>

                      <v-col cols="12" class="px-3">
                        <v-row no-gutters justify="space-between">
                          <v-col cols="5" sm="5" md="3">
                            Cheque Number: <span class="red--text">*</span>
                            <v-text-field
                                solo
                                flat
                                dense
                                class="simple_text_field mt-1"
                                placeholder="Cheque number"
                                v-model="senderInformation.chequeNo"
                                :rules="chequeNoRule">
                            </v-text-field>
                          </v-col>

                          <v-col cols="5" sm="5" md="3">
                            Contact Number: <span class="red--text">*</span>
                            <v-text-field
                                solo
                                flat
                                dense
                                type="number"
                                placeholder="Contact Number"
                                class="simple_text_field mt-1"
                                v-model="senderInformation.contactNo"
                                :rules="contactNoRule">
                            </v-text-field>
                          </v-col>

                          <v-col cols="5" sm="5" md="3">
                            Cheque Front: <span class="red--text">*</span>
                            <v-file-input
                                solo
                                flat
                                dense
                                prepend-icon=""
                                accept=".jpeg,.png"
                                class="file_input mt-1"
                                placeholder="Upload Document"
                                prepend-inner-icon="mdi-cloud-upload"
                                v-model="senderInformation.chequeFront"
                                :rules="chequeFrontRule">
                            </v-file-input>
                          </v-col>
                        </v-row>
                      </v-col>

                      <v-col cols="12" class="px-3">
                        <v-row no-gutters>
                          <v-col cols="5" sm="5" md="3">
                            Cheque Back: <span class="red--text">*</span>
                            <v-file-input
                                solo
                                flat
                                dense
                                prepend-icon=""
                                accept=".jpeg,.png"
                                class="file_input mt-1"
                                placeholder="Upload Document"
                                prepend-inner-icon="mdi-cloud-upload"
                                v-model="senderInformation.chequeBack"
                                :rules="chequeBackRule">
                            </v-file-input>
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
                    Receiver Information
                  </v-col>

                  <v-col cols="12">
                    <v-row no-gutters>
                      <v-col cols="12" class="px-3">
                        <v-row no-gutters justify="space-between">
                          <v-col cols="5" sm="5" md="3">
                            Deposited Bank: <span class="red--text">*</span>
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
                            Branch Name: <span class="red--text">*</span>
                            <v-text-field
                                solo
                                flat
                                dense
                                placeholder="Branch Name"
                                class="simple_text_field mt-1"
                                v-model="receiverInformation.branchName"
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
                                v-model="receiverInformation.depositedBy"
                                :rules="depositedByRule">
                            </v-text-field>
                          </v-col>
                        </v-row>
                      </v-col>

                      <v-col cols="12" class="px-3">
                        <v-row no-gutters justify="space-between">
                          <v-col cols="5" sm="5" md="3">
                            Deposited Amount: <span class="red--text">*</span>
                            <v-text-field
                                solo
                                flat
                                dense
                                class="simple_text_field mt-1"
                                placeholder="Deposited Amount"
                                v-model="receiverInformation.amount"
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
                                    v-model="receiverInformation.transactionDate">
                                </v-text-field>
                              </template>
                              <v-date-picker
                                  color="primary"
                                  v-model="receiverInformation.transactionDate">
                              </v-date-picker>
                            </v-menu>
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
                                v-model="receiverInformation.voucher"
                                :rules="voucherRule">
                            </v-file-input>
                          </v-col>
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
  name: "ChequePayment",
  props:['referralCode'],
  components: {
    // ServerErrors: () => import('@shared~pages/errors/ServerErrors'),
  },
  data() {
    return {
      bankList: [],
      senderInformation: {
        selectedBank: '',
        accountHolderName: '',
        accountNo: '',
        chequeNo: '',
        contactNo: '',
        chequeFront: [],
        chequeBack: [],
      },
      receiverInformation: {
        selectedBank: '',
        branchName: '',
        depositedBy: '',
        amount: '',
        transactionDate: new Date().toISOString().substr(0, 10),
        voucher: []
      },
      bankRule: [
        v => !!v || 'Bank is required.'
      ],
      accountHolderNameRule: [
        v => !!v || 'Account holder name is required.'
      ],
      accountNoRule: [
        v => !!v || 'Account number is required.'
      ],
      chequeNoRule: [
        v => !!v || 'Cheque number is required.'
      ],
      contactNoRule: [
        v => !!v || 'Contact no. is required.',
        v => (v.length === 10) || 'Must be of 10 digits.'
      ],
      branchNameRule: [
        v => !!v || 'Branch name is required.'
      ],
      depositedByRule: [
        v => !!v || 'Deposited By is required.'
      ],
      amountRules: [
        v => !!v || 'Amount is required.',
        v => /^\d+$/.test(v) || 'Must be a number only.',
      ],
      isFromBusinessPlan: false,
      datePickerMenu: false,
      btnLoadingState: false,
      serverErrors: []
    }
  },
  async fetch() {
    const { data }  = await  WalletServices.getAllBankList();
    this.bankList = data
  },
  computed: {
    voucherRule() {
      return this.checkValidationForVoucher();
    },
    chequeFrontRule() {
      return this.checkValidationForChequeFront();
    },
    chequeBackRule() {
      return this.checkValidationForChequeBack();
    },
    isError422() {

      return this.$store.getters['error/IS422Error'];

    }
  },
  methods: {
    checkValidationForVoucher() {
      if (!this.receiverInformation.voucher || this.receiverInformation.voucher.length === 0) {
        return ['Document is required.'];
      } else if (this.receiverInformation.voucher['size'] > (5 * 1024 * 1024)) {
        return ['Must be less than 5 MB.'];
      }
    },
    checkValidationForChequeFront() {
      if (!this.senderInformation.chequeFront || this.senderInformation.chequeFront.length === 0) {
        return ['Document is required.'];
      } else if (this.senderInformation.chequeFront['size'] > (5 * 1024 * 1024)) {
        return ['Must be less than 5 MB.'];
      }
    },
    checkValidationForChequeBack() {
      if (!this.senderInformation.chequeBack || this.senderInformation.chequeBack.length === 0) {
        return ['Document is required.'];
      } else if (this.senderInformation.chequeBack['size'] > (5 * 1024 * 1024)) {
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

      data.append('payment_type', 'cheque');
      data.append('cheque_bank_code', this.senderInformation.selectedBank['bank_code']);
      data.append('cheque_bank', this.senderInformation.selectedBank['bank_name']);
      data.append('cheque_holder_name', this.senderInformation.accountHolderName);
      data.append('cheque_account_number', this.senderInformation.accountNo);
      data.append('cheque_number', this.senderInformation.chequeNo);
      data.append('contact_phone_no', this.senderInformation.contactNo);
      data.append('document_types[0]', 'cheque_front');
      data.append('document_types[1]', 'cheque_back');
      data.append('document_images[0]', this.senderInformation.chequeFront);
      data.append('document_images[1]', this.senderInformation.chequeBack);

      data.append('bank_code', this.receiverInformation.selectedBank['bank_code']);
      data.append('deposit_bank_name', this.receiverInformation.selectedBank['bank_name']);
      data.append('deposited_branch_name', this.receiverInformation.branchName);
      data.append('amount', this.receiverInformation.amount);
      data.append('deposited_by', this.receiverInformation.depositedBy);
      data.append('transaction_date', this.receiverInformation.transactionDate);
      data.append('document_types[2]', 'voucher');
      data.append('document_images[2]', this.receiverInformation.voucher);

      this.$store.dispatch("payment/savePayment", data).then(res => {
        this.btnLoadingState = false;

        this.$store.commit("error/SET_422_ERROR", false);

        this.$store.commit("error/SET_422_ERROR_MESSAGE", null);
        this.$store.commit('notification/COMMIT_DIALOG', {
          message: res.message,
          color:'green'
        });

        this.closeForm();
      }).catch(err => {
        errorHandler(err);

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
