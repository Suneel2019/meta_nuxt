<template>
  <v-card outlined class="mt-3 pb-5">
    <Header />
    <v-row no-gutters>
      <v-col cols="12" class="primaryHeaderColor subtitle-1 font-weight-medium px-3 pt-2 pb-1">
        Balance Statement
      </v-col>
      <v-col cols="12" class="body-2 px-3 pt-3">
        <v-row no-gutters>
          <v-col cols="12">
            <v-card outlined>
              <v-row no-gutters>
                <v-col cols="12" class="primaryHeaderColor body-2 font-weight-medium px-3 pt-2 pb-1">
                  Filter
                </v-col>

                <v-col cols="12" class="pa-3">
                  <v-row no-gutters>
                    <v-col cols="12" sm="3" md="3" lg="2" xl="2">
                      <v-menu
                        offset-y
                        min-width="290px"
                        transition="scale-transition"
                        :nudge-right="40"
                        :close-on-content-click="false"
                        v-model="startDateMenu"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          Start Date:
                          <v-text-field
                            solo
                            dense
                            v-on="on"
                            hide-details
                            v-bind="attrs"
                            style="width: 150px;"
                            placeholder="Start Date"
                            prepend-inner-icon="mdi-calendar"
                            class="text_field_with_prepend_inner_icon mt-1"
                            v-model="startDate">
                          </v-text-field>
                        </template>

                        <v-date-picker
                          v-model="startDate"
                          @input="startDateMenu = false">
                        </v-date-picker>
                      </v-menu>
                    </v-col>

                    <v-col cols="12" sm="3" md="3" lg="2" xl="2">
                      <v-menu
                        offset-y
                        min-width="290px"
                        transition="scale-transition"
                        :nudge-right="40"
                        :close-on-content-click="false"
                        v-model="endDateMenu"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          End Date:
                          <v-text-field
                            solo
                            dense
                            v-on="on"
                            hide-details
                            v-bind="attrs"
                            style="width: 150px;"
                            placeholder="End Date"
                            prepend-inner-icon="mdi-calendar"
                            class="text_field_with_prepend_inner_icon mt-1"
                            v-model="endDate">
                          </v-text-field>
                        </template>

                        <v-date-picker
                          v-model="endDate"
                          @input="endDateMenu = false">
                        </v-date-picker>
                      </v-menu>
                    </v-col>

                    <v-col cols="12" sm="3" md="3" lg="4" xl="2">
                      Transaction Type
                      <v-autocomplete
                        solo
                        dense
                        hide-details
                        item-text="name"
                        item-value="code"
                        placeholder="-- Select Type -- "
                        class="auto_complete_with_append_inner_icon mt-1"
                        :items="transactionTypeList"
                        v-model="selectedTransactionType">
                      </v-autocomplete>
                    </v-col>

                    <v-col cols="12" sm="3" md="3" lg="3" xl="2"  class="text-right align-content-sm-start mt-5">
                      <v-btn
                        small
                        depressed
                        class="primary"
                        @click="filterData"
                      >
                        <v-icon left>mdi-filter</v-icon>
                        Filter
                      </v-btn>

                      <v-btn
                        small
                        depressed
                        class="ml-2"
                        color="success"
                        @click="resetFilter"
                      >
                        Reset
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
          </v-col>

          <v-col cols="12" class="caption mt-5 px-3">
            <v-row no-gutters>
              <v-col cols="12" sm="12" md="3" class="mt-2">
                Total Items: <span class="font-weight-bold">{{ totalItems }}</span>
              </v-col>

              <v-col cols="12" sm="12" md="3">
                <v-row no-gutters align="center">
                  <v-col cols="7" class="text-end pr-3">
                    Items Per Page:
                  </v-col>
                  <v-col cols="5">
                    <v-autocomplete
                      solo
                      dense
                      hide-details
                      style="width: 120px;"
                      class="auto_complete_with_append_inner_icon"
                      :items="itemsPerPageList"
                      v-model="itemPerPage"
                      @input="getStatementList">
                    </v-autocomplete>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
          <!--          v-if="statementList.length !== 0"-->
          <v-col cols="12" class="mt-5 pb-3">
            <v-card outlined>
              <v-data-table
                disable-sort
                disable-filtering
                hide-default-footer
                :headers="tableHeaders"
                :items="statementList"
                :loading="tableLoadingState"
                :items-per-page="itemPerPage"
              >
                <template v-slot:no-data>
                  No data available at the moment
                </template>

                <template v-slot:item.verified_at="{ item }">
                  {{ item['verified_at'].substring(0, 10) }}
                </template>

                <template v-slot:item.transaction_type="{ item }">
                  {{ item['transaction_type'] }}
                </template>

                <template v-slot:item.debit="{ item }">
                  <div v-if="item['accounting_entry_type'] ==='dr'">
                    {{ formatCurrency(item['transaction_amount']) }}
                  </div>

                  <div v-else>---</div>
                </template>

                <template v-slot:item.credit="{ item }">
                  <div v-if="item['accounting_entry_type'] ==='cr'">
                    {{ formatCurrency(item['transaction_amount']) }}
                  </div>

                  <div v-else>---</div>
                </template>

                <template v-slot:item.current_balance="{ item }">
                  <span class="caption">{{ item['current_balance'] }}</span>
                </template>
              </v-data-table>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" class="mt-3">
        <v-row no-gutters justify="center">
          <v-col cols="3">
            <v-pagination
              :disabled="tableLoadingState"
              :length="totalPages"
              v-model="page"
              @input="getStatementList">
            </v-pagination>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import statementRegister from "@/store/store/statement";
import stringHandler from '@/helpers/shared/dataFormatter'
import Header from "../../../../components/store/payment/offline-header/Header";
export default {
  name: "index",
  components: {Header},
  layout: 'store-dashboard',
  data: () => ({
    startDateMenu: false,
    endDateMenu: false,
    startDate: null,
    endDate: null,
    transactionTypeList: [],
    selectedTransactionType: null,
    totalItems: null,
    itemsPerPageList: [10, 20, 50],
    itemPerPage: 10,
    totalPages: null,
    page: 1,
    tableHeaders: [
      {
        text: 'S.N.',
        value: 'sn',
      },
      {
        text: 'Date',
        value: 'verified_at',
      },
      {
        text: 'Transaction Type',
        value: 'transaction_type',
      },
      {
        text: 'Debit',
        value: 'debit'
      },
      {
        text: 'Credit',
        value: 'credit'
      },
      {
        text: 'Current Balance',
        value: 'current_balance',
      },
    ],
    statementList: [],
    tableLoadingState: true,
    currentTotalAmount: 0,
    isDataLoaded: false,
  }),
   fetch(){
    !this.$store.hasModule('statement') ? this.$store.registerModule('statement', statementRegister) : '';
    this.getStatementList();
    this.transactionList();
  },
  methods: {
    async transactionList(){
      this.transactionTypeList.length = 0
      let {data} = await this.$store.dispatch('statement/getTransactionTypes');
      this.transactionTypeList = data['transaction_purposes'];
    },
    filterData() {
      this.page = 1;

      const params = {
        transaction_type: this.selectedTransactionType,
        transaction_date_from: this.startDate,
        transaction_date_to: this.endDate,
        records_per_page: this.itemPerPage,
        page: this.page
      };

      this.tableLoadingState = true;

      this.$store.dispatch('statement/getBalanceStatements', params).then(res => {
        this.tableLoadingState = false;
        this.statementList = res.data;
        this.statementList.map((item, idx) => {
          item['sn'] = `${idx + 1}.`;
        });
        this.totalPages = res['meta']['last_page'];
        this.totalItems = res['meta']['total'];
      });
    },
    resetFilter() {
      this.startDateMenu = false;
      this.endDateMenu = false;
      this.startDate = null;
      this.endDate = null;
      this.selectedTransactionType = null;
      this.totalItems = null;
      this.itemPerPage = 10;
      this.page = 1;

      this.getStatementList();
    },
    getStatementList() {
      const params = {
        transaction_type: this.selectedTransactionType,
        transaction_date_from: this.startDate,
        transaction_date_to: this.endDate,
        records_per_page: this.itemPerPage,
        page: this.page
      };

      this.tableLoadingState = true;

      this.$store.dispatch('statement/getBalanceStatements', params).then(res => {
        this.tableLoadingState = false;
        this.statementList = res.data;
        this.statementList.map((item, idx) => {
          item['sn'] = `${idx + 1}.`;
        });
        this.totalPages = res['meta']['last_page'];
        this.totalItems = res['meta']['total'];
      });
    },
    formatCurrency(amount) {
      return stringHandler.formatCurrency(amount);
    }
  }
}
</script>

<style scoped>

</style>
