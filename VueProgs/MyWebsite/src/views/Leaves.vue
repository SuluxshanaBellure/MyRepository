<template>
  <div class="leave-form-overlay">
    <div class="leave-form">
      <h2>Apply Leaves</h2>
      <div>
        <label>Request Type</label>
        <div>
          <label><input type="radio" value="Leave" v-model="requestType"> Leave</label>
          <label><input type="radio" value="Short Leave" v-model="requestType"> Short Leave</label>
          <label><input type="radio" value="WFH" v-model="requestType"> WFH</label>
        </div>
      </div>
      <div>
        <label>Leave Type</label>
        <div>
          <label><input type="radio" value="Casual Leave" v-model="leaveType"> Casual Leave</label>
          <label><input type="radio" value="Compensatory off" v-model="leaveType"> Compensatory off</label>
        </div>
      </div>
      <div>
        <label>From</label>
        <div>
          <input type="text" v-model="fromDate" placeholder="From">
          <label><input type="radio" value="Full" v-model="fromDayType"> Full</label>
          <label><input type="radio" value="First Half" v-model="fromDayType"> First Half</label>
          <label><input type="radio" value="Second Half" v-model="fromDayType"> Second Half</label>
        </div>
      </div>
      <div>
        <label>To</label>
        <div>
          <input type="text" v-model="toDate" placeholder="To">
          <label><input type="radio" value="Full" v-model="toDayType"> Full</label>
          <label><input type="radio" value="First Half" v-model="toDayType"> First Half</label>
          <label><input type="radio" value="Second Half" v-model="toDayType"> Second Half</label>
        </div>
      </div>
      <button @click="$emit('close')">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      requestType: 'Leave',
      leaveType: 'Casual Leave',
      fromDate: '',
      toDate: '',
      fromDayType: 'Full',
      toDayType: 'Full',
    };
  },
};
</script>

<style scoped>
.leave-form-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.leave-form {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>