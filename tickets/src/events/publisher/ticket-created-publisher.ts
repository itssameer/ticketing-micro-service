import {
  Subjects,
  Publisher,
  TicketCreatedEvent,
} from "@microservice_poc/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  // readonly subject = Subjects.TicketCreated

  // or

  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
