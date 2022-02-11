<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-card outlined>
        <v-row no-gutters>
          <v-col cols="12" class="subtitle-1 font-weight-medium headerPrimaryColor px-3 pt-1 pb-1 mb-3">
            Cash Payment
          </v-col>
          <ErrorHandling422 v-if="isError422"></ErrorHandling422>

          <v-col cols="12" class="px-3 pb-3">
            <v-card outlined>
              <v-row no-gutters>
                <v-col cols="12" class="subtitle-1 font-weight-medium headerPrimaryColor px-3 pt-1 pb-1 mb-5">
                  Sender Information
                </v-col>
                <v-col cols="12">
                  <v-form ref="offlinePaymentForm">
                    <v-row no-gutters>
                      <v-col cols="12" class="px-3">
                        <v-row no-gutters justify="space-between">
                          <v-col cols="5" sm="5" md="3">
                            Bank Name: <span class="red--text">*</span>
                            <v-autocomplete
                                solo
                                flat
                                dense
                                return-object
                                item-text="bank_name"
                                placeholder="--- Select Bank ---"
                                class="auto_complete_with_append_inner_icon mt-1"
                                :items="bankList"
                                v-model="selectedBank"
                                :rules="bankNameRule">
                            </v-autocomplete>
                          </v-col>

                          <v-col cols="5" sm="5" md="3">
                            Branch Name <span class="red--text">*</span> :
                            <v-text-field
                                solo
                                flat
                                dense
                                placeholder="Branch Name"
                                class="simple_text_field mt-1"
                                v-model="branchName"
                                :rules="branchNameRule">
                            </v-text-field>
                          </v-col>

                          <v-col cols="5" sm="5" md="3">
                            Deposited By: <span class="red--text">*</span>
                            <v-text-field
                                solo
                                flat
                                dense
                                placeholder="Deposited By"
                                class="simple_text_field mt-1"
                                v-model="depositedBy"
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
                                v-model="amount"
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
                                    v-model=transactionDate>
                                </v-text-field>
                              </template>
                              <v-date-picker color="primary" v-model="transactionDate"></v-date-picker>
                            </v-menu>
                          </v-col>

                          <v-col cols="5" sm="5" md="3">
                            Contact No: <span class="red--text">*</span>
                            <v-text-field
                                solo
                                flat
                                dense
                                placeholder="Contact No."
                                class="simple_text_field mt-1"
                                v-model="contactNo"
                                :rules="contactNoRule">
                            </v-text-field>
                          </v-col>
                        </v-row>
                      </v-col>

                      <v-col cols="12" class="px-3">
                        <v-row no-gutters>
                          <v-col cols="5" sm="5" md="3">
                            Upload Voucher: <span class="red--text">*</span>
                            <v-file-input
                                solo
                                flat
                                dense
                                prepend-icon=""
                                truncate-length="15"
                                accept=".jpg,.jpeg,.png"
                                class="file_input mt-1"
                                placeholder="Upload Document"
                                prepend-inner-icon="mdi-cloud-upload"
                                v-model="voucher"
                                :rules="voucherRule">
                            </v-file-input>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-col>
              </v-row>
            </v-card>
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
          color="error"
          class="ml-3"
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
  name: "CashPayment",
  components: {ErrorHandling422},
  props:['referralCode'],
  data() {
    return {
      bankList: [],
      selectedBank: '',
      bankNameRule: [
        v => !!v || 'Bank name is required.'
      ],
      branchName: '',
      branchNameRule: [
        v => !!v || 'Branch name is required.'
      ],
      depositedBy: '',
      depositedByRule: [
        v => !!v || 'Deposited By is required.'
      ],
      amount: '',
      amountRules: [
        v => !!v || 'Amount is required.',
        v => /^\d+$/.test(v) || 'Must be a number only.',
      ],
      isFromBusinessPlan: false,
      datePickerMenu: false,
      transactionDate: new Date().toISOString().substr(0, 10),
      contactNo: '',
      contactNoRule: [
        v => !!v || 'Contact no. is required.',
        v => /^\d+$/.test(v) || 'Must be a number only.',
        v => (v.length === 10) || 'Must be of 10 digits.'
      ],
      voucher: [],
      btnLoadingState: false,
      serverErrors: []
    }
  },
  async fetch() {
    const {data} = await  WalletServices.getAllBankList();
    this.bankList = data
  },
  computed: {

    voucherRule() {
      return this.checkFile();
    },
    isError422() {

      return this.$store.getters['error/IS422Error'];

    }
  },
  methods: {
    checkFile() {
      if (!this.voucher || this.voucher.length === 0) {
        return ['Document is required.'];
      } else if (this.voucher['size'] > (5 * 1024 * 1024)) {
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
      data.append('payment_type', 'cash');
      data.append('bank_code', this.selectedBank['bank_code']);
      data.append('bank_name', this.selectedBank['bank_name']);
      data.append('branch_name', this.branchName);
      data.append('amount', this.amount);
      data.append('deposited_by', this.depositedBy);
      data.append('transaction_date', this.transactionDate);
      data.append('contact_phone_no', this.contactNo);
      data.append('document_types[0]', 'voucher');
      data.append('document_images[0]', this.voucher);

      this.$store.dispatch("payment/savePayment", data).then(res => {
        this.btnLoadingState = false;
        this.$store.commit("error/SET_422_ERROR", false);

        this.$store.commit("error/SET_422_ERROR_MESSAGE", null);
        this.$store.commit('notification/COMMIT_DIALOG', {

          title: 'Account Created',

          message: res.message,

        });

        this.closeForm();
      }).catch(e => {
        this.btnLoadingState = false;
        errorHandler(e, this);
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
