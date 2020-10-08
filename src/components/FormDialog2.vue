<div class="q-gutter-sm">
              <q-radio v-model="status" val=1 label="Pending" color="teal-1" />
              <q-radio v-model="status" val=2 label="Started" color="teal-2" />
              <q-radio v-model="status" val=3 label="Working" color="teal-3" />
              <q-radio v-model="status" val=4 label="On Hold" color="teal-4" />
              <q-radio v-model="status" val=5 label="Completed" color="teal-5" />
            </div>

            <div class="q-gutter-sm">
              <q-radio v-model="priority" val=1 label="Least" color="cyan-1" />
              <q-radio v-model="priority" val=2 label="Regular" color="cyan-2" />
              <q-radio v-model="priority" val=3 label="Remember" color="cyan-3" />
              <q-radio v-model="priority" val=4 label="Important" color="cyan-4" />
              <q-radio v-model="priority" val=5 label="Most" color="cyan-5" />
            </div>

            <q-toggle v-model="archived" label="Archived" color="blue" />
